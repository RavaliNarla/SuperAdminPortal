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
-- `id` is a UUID (not an auto-increment int) — it's the value the frontend
-- resolves once via GET /portalScreens and then passes as the `screen`
-- query param to the form-schemas endpoint below, e.g.
-- "91a893d9-7538-432a-8fc2-2bda3182bee4".
CREATE TABLE portal_screens (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_key  VARCHAR(100) NOT NULL,   -- organization's code, e.g. "HSBC"
    screen_id         UUID NOT NULL REFERENCES portal_screens(id),
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

**`fields[].id` is generated client-side**, not by the backend — `FieldListEditor.js`'s
`emptyField()` calls `crypto.randomUUID()` the moment an admin clicks "+ Field", and that id
never changes afterward (editing label/required/options/etc. never touches it; the only way
to get a new id for a "field" is to remove it and add a fresh one). The backend's job is to
store whatever `id` arrives verbatim inside the JSONB array — **never generate, reassign, or
dedupe it server-side** — because downstream consumers (Recruitment Portal's
`orgDynamicFieldValues`, Candidate Portal's per-inclusion claim values) use this id as the
persistent key for *values entered against this field*, on records that live in entirely
different tables/services the form-schema backend has no visibility into. Regenerating an id
server-side would silently orphan any values already stored under the old one.

## Endpoints

> This section reflects the **actual live contract** (verified against Swagger and real
> responses), which differs from an earlier draft of this doc: `screen` is a UUID passed as a
> query param, resolved by the client from `GET /portalScreens` — it's not a `{portal}/{formKey}`
> path segment, and there's no separate lookup-by-key on this endpoint itself.

### `GET /portalScreens`

Returns the full dev-maintained catalog (all rows of `portal_screens`). Every caller — the
SuperAdmin editor and every consuming portal — resolves the `screenId` it needs by fetching
this list and filtering client-side for `{ portal, screenKey: formKey, isActive: true }`.

### `GET /organizations/{organizationCode}/form-schemas?screen={screenId}`

Returns the saved schema for that org+screen, or a response with empty/absent `fields` if none
has been configured yet — consuming apps treat that as "use defaults / render nothing extra."

Response (real shape, wraps the row in a standard envelope):
```json
{
  "success": true,
  "message": "Organization form schema updated successfully",
  "data": {
    "id": "b3c52d5e-5626-4bd7-9cb8-30a86a150ce6",
    "organizationCode": "HSBC",
    "screenId": "91a893d9-7538-432a-8fc2-2bda3182bee4",
    "fields": [ /* ... */ ],
    "isActive": true,
    "createdBy": "...", "modifiedBy": "...",
    "createdDate": "...", "modifiedDate": "..."
  }
}
```
`data.fields` has been observed as a real JSON array in practice (not a JSON-encoded string) —
both `formSchemaService.js` (SuperAdminPortal) and `orgFormSchemaService.js` (Recruitment
Portal) parse it defensively either way, so either representation is safe to send.

- Called by: SuperAdminPortal (to load the editor) and every consuming portal at runtime
  (Recruitment Portal's `orgFormSchemaService.js` today; Candidate Portal reads the analogous
  `"candidate"`-portal screens the same way via `useOrgScreenSchema`).
- Auth: normal authenticated access — read-only, no admin gate needed.

### `PUT /organizations/{organizationCode}/form-schemas?screen={screenId}`

Full-replace upsert (the editor always sends the complete field list, never a partial patch).
`fields[].id` values are opaque, client-generated (see above) — persist them exactly as sent.

Request body: the `fields` array itself (JSON-encoded).

- Called by: SuperAdminPortal only.
- **Auth: must be restricted to SuperAdmin role.** This endpoint rewrites what fields render
  on a live production screen for an organization.
- No optimistic-concurrency check today — it's last-write-wins if two admins save the same
  org+screen concurrently. Worth flagging to backend if that needs a version/etag guard later.

### Handler logic

```
handle request(organizationCode, screenId):
    screen = SELECT * FROM portal_screens WHERE id = :screenId
    if screen is null: return 400 (unknown screenId)

    # GET:
    row = SELECT * FROM organization_form_schemas
          WHERE organization_key = :organizationCode AND screen_id = :screenId
    return { success: true, data: row } (row.fields defaults to [] if no row exists yet)

    # PUT (SuperAdmin only):
    validate body fields: each has an `id` (string, pass through as-is) and type in
        {text, dropdown, multiselect, date, checkbox}, non-empty label;
        text requires numeric maxLength; dropdown/multiselect require non-empty options array
    UPSERT organization_form_schemas (organization_key, screen_id, fields)
        ON CONFLICT (organization_key, screen_id) DO UPDATE ...
    return { success: true, message: "...", data: row }
```

## Section title (client-side convention, no schema change)

Each screen's field list can carry an optional heading ("Section Title" in
`FormFieldsBuilder.js`), shown above the fields on the consuming portal
(Recruitment Portal's `DynamicFieldRenderer`, Candidate Portal's
`DynamicFormRenderer`). There's no `title` column on
`organization_form_schemas` — adding one would require changing the PUT body
shape for every screen that uses this endpoint, which is riskier than it's
worth for one label. Instead, the title is stored as a reserved entry inside
the `fields` array itself:

```json
{ "id": "__section_title__", "type": "text", "label": "<the title text>", "required": false }
```

This passes the existing field validation verbatim (non-empty label, allowed
type), so it round-trips through `fields JSONB` with **no backend change
required**. Every reader (`FormFieldsBuilder.js`, Recruitment Portal's
`orgFormSchemaService.js`, Candidate Portal's `useOrgScreenSchema.js`) filters
this entry out of the editable/rendered field list by its reserved id and
surfaces it separately as `schema.title`. When no title is set, the entry is
omitted from the array entirely (not sent as an empty label). If a real
`title` column is ever added server-side, this convention can be retired in
favor of it — the three call sites above are the only places that would need
to change.

## Adding a new screen (e.g. Candidate Portal)

Candidate Portal has already done this for its "basic details"/"education details" candidate
screens (via `useOrgScreenSchema`), so the steps below are the established, repeated pattern —
not a hypothetical:

1. Developer builds the render code on the consuming portal (a page + `DynamicFieldRenderer`
   equivalent) and resolves its `screenId` via `GET /portalScreens`, filtering for
   `{ portal: "candidate", screenKey: "<screenKey>" }`, then calls the same
   `GET .../form-schemas?screen={screenId}` endpoint.
2. Developer inserts a row into `portal_screens` for `('candidate', '<screenKey>',
   '<Screen Name>')`.
3. Add the matching entry to `CONFIGURABLE_FORMS` in `DynamicFormsHome.js` so SuperAdmin can
   select it in the editor.

No schema/table changes needed for step 3 — the existing `organization_form_schemas` table
and both endpoints already work for any `(portal, screenKey)` pair once `portal_screens` and
the frontend catalog know about it.
