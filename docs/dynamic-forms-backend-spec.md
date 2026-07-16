# Dynamic Fields (on Existing Forms) — Backend Spec

Backend handoff for the "Dynamic Forms" feature (`src/pages/organizations/DynamicForms/`).

Important scope note: **no new forms are created by this feature.** SuperAdmin attaches
extra *fields* onto forms/screens that already exist in the product (e.g. Requisition,
Job Posting). Those extra fields are then rendered live on the consuming portal, appended
below the form's existing static fields (Recruitment Portal today; Candidate Portal later).

## Ownership split

- **Which existing screens are allowed to receive extra fields** (`requisition`, `jobPosting`,
  future ones) is **developer-owned** — a screen only appears here once a developer has
  shipped the actual render code for it (e.g. `CreateRequisition.jsx` +
  `DynamicFieldRenderer.jsx` in the Recruitment Portal repo). SuperAdmin cannot add new
  screens to this list through the UI, and this feature never creates a new form/page.
- **What extra fields appear on a screen** (label, type, required, options, etc.) is
  **SuperAdmin-owned**, configured through `FormFieldsBuilder.js` and saved per organization.

This is why the two tables below are split the way they are, and why the write endpoint is
gated to SuperAdmin only.

## Tables

```sql
-- Dev-maintained catalog of screens that exist per portal.
-- A row is added by a developer when a screen ships, not by an admin.
CREATE TABLE portal_screens (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    portal      VARCHAR(20)  NOT NULL,   -- 'recruitment' | 'candidate'
    screen_key  VARCHAR(50)  NOT NULL,   -- 'requisition' | 'jobPosting'
    screen_name VARCHAR(200) NOT NULL,   -- 'Requisition Form' | 'Job Posting Form'
    UNIQUE (portal, screen_key)
);

INSERT INTO portal_screens (portal, screen_key, screen_name) VALUES
    ('recruitment', 'requisition', 'Requisition Form'),
    ('recruitment', 'jobPosting',  'Job Posting Form');

-- SuperAdmin-maintained extra-field definitions, one row per (organization, screen).
-- These fields are appended to the screen's existing static fields — no title/heading
-- of their own, since they're not a separate sub-form.
CREATE TABLE organization_form_schemas (
    id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    organization_key  VARCHAR(100) NOT NULL,   -- organization's code, e.g. "bob"
    screen_id         BIGINT NOT NULL REFERENCES portal_screens(id),
    fields            JSONB NOT NULL DEFAULT '[]',
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (organization_key, screen_id)
);
```

`fields` is stored as JSON rather than normalized columns because field shape varies by
`type` (`text` has `placeholder`/`maxLength`, `dropdown` has `options`, `date` and `checkbox`
have neither) and new types may be added later. Example element:

```json
{
  "id": "f27fc91e-b4c7-49ce-b08d-789690046db2",
  "type": "text",
  "label": "Department Code",
  "required": true,
  "placeholder": "Enter department code",
  "maxLength": 20
}
```

## Endpoints

### `GET /organizations/{organizationKey}/{portal}/form-schema/{formKey}`

Returns the saved schema, or 404 if none has been configured yet — both consuming apps
already treat "not found" as "use defaults / render nothing extra."

Response:
```json
{ "fields": [ /* ... */ ] }
```

- Called by: SuperAdminPortal (to load the editor) and every consuming portal at runtime
  (Recruitment Portal's `orgFormSchemaService.js` today).
- Auth: normal authenticated access — read-only, no admin gate needed.

### `PUT /organizations/{organizationKey}/{portal}/form-schema/{formKey}`

Full-replace upsert (the editor always sends the complete field list, never a partial patch).

Request body:
```json
{ "fields": [ /* ... */ ] }
```

- Called by: SuperAdminPortal only.
- **Auth: must be restricted to SuperAdmin role.** This endpoint rewrites what fields render
  on a live production screen for an organization.
- Ignore any `formId` field if the client sends one — it's a display string the frontend
  builds for itself (`form-${portal}-${formKey}-${organizationKey}`), not a key to persist.

### Handler logic

```
handle request(organizationKey, portal, formKey):
    screen = SELECT * FROM portal_screens WHERE portal = :portal AND screen_key = :formKey
    if screen is null: return 400 (unknown portal/formKey combination)

    # GET:
    row = SELECT fields FROM organization_form_schemas
          WHERE organization_key = :organizationKey AND screen_id = screen.id
    return row or 404

    # PUT (SuperAdmin only):
    validate body.fields: each has type in {text, dropdown, date, checkbox}, non-empty label;
        text requires numeric maxLength; dropdown requires non-empty options array
    UPSERT organization_form_schemas (organization_key, screen_id, fields)
        ON CONFLICT (organization_key, screen_id) DO UPDATE ...
    return { fields }
```

## Adding a new screen later (e.g. Candidate Portal)

1. Developer builds the render code on the consuming portal (a page + `DynamicFieldRenderer`
   equivalent) and adds the fetch call using the same `GET` endpoint shape with `portal:
   "candidate"`.
2. Developer inserts a row into `portal_screens` for `('candidate', '<screenKey>',
   '<Screen Name>')`.
3. Add the matching entry to `CONFIGURABLE_FORMS` in `DynamicFormsHome.js` so SuperAdmin can
   select it in the editor.

No schema/table changes needed for step 3 — the existing `organization_form_schemas` table
and both endpoints already work for any `(portal, formKey)` pair once `portal_screens` and
the frontend catalog know about it.
