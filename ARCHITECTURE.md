# SuperAdminPortal — Architecture Reference

> Purpose: a from-scratch architecture doc for this repo, written by reading the codebase directly. Covers tech stack, bootstrap/routing, state/API layers, module inventory, and the two cross-repo features (Dynamic Forms, Inclusions) that integrate with the sibling `RecruitmentPortal` repo. Revised after the Dynamic Forms and Inclusions features were built out and corrected through several iterations — see §7–§9 for the current, verified state of both.

## 1. Tech Stack

- **React 18.2**, **Create React App** (`react-scripts 5.0.1`) — no TypeScript, no Vite/Next.
- **react-router-dom 7.10.1** — routing, flat (no org-slug URL segment, unlike `RecruitmentPortal`).
- **@reduxjs/toolkit 2.11.1** + **redux-persist 6** — state, persisted to `localStorage` under key `"rms-super-admin"`.
- **axios 1.13.2** — HTTP client. Two independent axios setups exist side by side (see §5) — not yet unified.
- **react-bootstrap 2.10 / bootstrap 5.3 / bootstrap-icons**, plus **@mui/material 7**, **@fortawesome**, **react-feather**, **react-icons**.
- `package.json` name is still the CRA default-ish `"bob_app"`.

## 2. App Bootstrap & Routing

**`src/App.js`** — a single flat `<Routes>` tree, no org-slug prefix. `ProtectedLayout` gates every route behind `state.auth.loggedIn` (a plain boolean, see §3) and wraps them in `AppShell` (Header + `Sidebar`).

Routes registered: `/login`, `/organizations`, `/organizations/new`, `/organizations/:organizationId/edit`, `/organizations/:organizationId`, `/organizations/:organizationId/dynamic-forms`, `/eligibility-configuration/*` (nested: `categories`, `inclusions`, `education-experience`, `exclusions`, `vacancy-breakdown`), `/validation-workflow`, `/eligibility-overview`, `/authentication-configuration`.

**`src/components/layout/Sidebar.js`** lists more menu items than routes exist for: `Dashboard`, `Admin`, `Roles & Privileges`, `Permissions`, `Site Configuration` have no matching `<Route>` in `App.js`.

## 3. Authentication

**Not real auth.** `src/pages/Login.js` checks hardcoded credentials (`admin` / `password`) client-side and dispatches `login()` on `authSlice` (`{ loggedIn: boolean }`). No token, no user identity, no role/privilege model. `core/service/apiService.js`'s `api` instance attaches no `Authorization` header.

## 4. State Management (Redux Toolkit + redux-persist)

**`src/app/store.js`** — `combineReducers({ organizations, auth, formSchemas, eligibility })`, wrapped in `redux-persist` (`localStorage`, key `"rms-super-admin"`).

- **`organizations`** ([hooks/orgSlice.js](src/pages/organizations/hooks/orgSlice.js) — moved here from `features/organizations/` at some point outside this doc's authorship; `organizationThunk.js` lives alongside it in the same `hooks/` folder now): `{ items: [], selectedOrganization: null, loading, error }`. `items` is populated only by dispatching `fetchOrganizations` (done once, in `OrganizationList.js`) → `mapOrganizationList` (in `mapper/mapper.js`, still at its original path). That mapper **now includes `code`** (`organization.code || organization.organizationDetailsJson?.code`) — it originally didn't, which was the root cause of `DynamicFormsHome`'s "No code set for this organization" warning firing even when a code existed; fixed by including it in the list mapper, not just the by-id mapper.
- **`auth`**: just `{ loggedIn }`.
- **`formSchemas`**: local mock store for Dynamic Forms schemas (fallback only — see §7).
- **`eligibility`** ([eligibilitySlice.js](src/pages/EligibilityConfiguration/eligibilitySlice/eligibilitySlice.js)): `{ selectedOrganization, vacancyReservation, categoriesAndAgeRelaxations, inclusions, exclusions, educationExperienceValidation, loading, error }`. `inclusions` is populated via `fetchInclusions(organizationId)` — **keyed by the org's internal `id`**, not its `code`. This is a different identity scheme than Dynamic Forms uses (see §8).

## 5. API Layer — two parallel setups

| File | Style | Used by |
|---|---|---|
| [`src/core/service/apiService.js`](src/core/service/apiService.js) | one `axios.create()` instance (`api`), response interceptor unwraps `response.data`, no auth header | `formSchemaApiService.js`, `portalScreensApiService.js` |
| [`src/pages/organizations/services/ApiService.js`](src/pages/organizations/services/ApiService.js) | raw `axios.get/post/put` calls per method, manual headers, no response unwrapping | organization CRUD |
| [`src/pages/EligibilityConfiguration/services/eligibilityApiService.js`](src/pages/EligibilityConfiguration/services/eligibilityApiService.js) | its own raw `axios` calls (not the `api` instance), manual headers | Eligibility Configuration (Inclusions, Exclusions, Categories, Vacancy/Marks) |

Both `REACT_APP_API_BASE_URL` env-var-based setups point at the same active backend today: `https://172.16.2.11:8087/super-admin-portal/api/v1/super-admin`.

## 6. Module Inventory

### 6.1 `organizations`
CRUD for tenant orgs: `OrganizationList`, `OrganizationForm`, `OrganizationDetails`, plus `AuthenticationConfiguration` / `CandidateLoginSection` sub-sections.

### 6.2 `EligibilityConfiguration` / `EligibilityOverview` / `ValidationWorkflow` / `HeaderEligibility`
Self-contained mini-modules, each with its own `services/`, `mapper/`. `EligibilityConfiguration` has its own slice+thunk, now combined into the root store (see §4).

### 6.3 `DynamicForms` — org-level configurable extra fields (§7)
### 6.4 Inclusions — per-inclusion candidate schema (§9, part of `EligibilityConfiguration`)

## 7. Dynamic Forms — verified, working flow

**Purpose**: let a super-admin define extra fields (beyond the fixed schema) per organization, per portal (`recruitment` and `candidate`), per screen.

**Entry point**: `src/pages/organizations/DynamicForms/DynamicFormsHome.js`, routed at `/organizations/:organizationId/dynamic-forms`.

```
organizationId (URL param)
  → useAppSelector: state.organizations.items.find(org => org.id === organizationId)
  → organizationKey = organization.code || organization.id
  → screens = usePortalScreens() → GET /portalScreens
      { id (uuid), portal, screenKey, screenName, isActive }
  → user picks a screen (grouped by portal in an <optgroup>)
  → <FormFieldsBuilder organizationKey portal formKey screenId>
```

`portalScreens` is now a **real, dynamic API-driven catalog** (`portalScreensApiService.js` / `usePortalScreens.js`) — it replaced an earlier hardcoded `CONFIGURABLE_FORMS` array that only listed `requisition`/`jobPosting` under `recruitment`. The `candidate` portal (e.g. `basic details`, `education details` screens) is now live and populated from the same endpoint.

**`FormFieldsBuilder.js`** is now a thin wrapper around **`FieldListEditor.js`** (see §9.2 — this component is shared with the Inclusions feature). It fetches/saves via `src/services/formSchemaService.js`:

```
fetchFormSchema(orgKey, portal, formKey, screenId)
  1. formSchemaApiService.getFormSchema(orgKey, screenId)
     → GET /organizations/{orgCode}/form-schemas?screen={screenId}
  2. body.data.fields — observed as a real JSON array in practice (despite
     Swagger's generic "string" type annotation); parsed defensively if it
     ever arrives as a JSON-encoded string instead
  3. on any failure → falls back to Redux formSchemas mock (local-only, not
     shared with RecruitmentPortal)

saveFormSchema(orgKey, portal, formKey, schema, screenId)
  1. formSchemaApiService.saveFormSchema(orgKey, screenId, schema.fields)
     → PUT /organizations/{orgCode}/form-schemas?screen={screenId}
     body = JSON.stringify(fields) — the `api` instance's default
     Content-Type: application/json causes axios's transformRequest to
     JSON.stringify again, producing the double-encoded string body the
     endpoint's OpenAPI schema declares
  2. on failure → local mock fallback only (not persisted server-side)
```

This was corrected through live Swagger/Network-tab verification — the original implementation guessed at a `/{portal}/form-schema/{formKey}` path shape that didn't match the real backend at all (real shape: `/form-schemas?screen={screenId}`, `screenId` is a uuid from `/portalScreens`, not the screen's string key).

**Field types** (`FieldListEditor.js`, `DEFAULT_FIELD_TYPES`): Text, Dropdown, Multi-select Dropdown, Date, Checkbox.

### 7.1 Consumption on the RecruitmentPortal side

`RecruitmentPortal/src/modules/jobPosting/hooks/useOrgFormSchema.js` + `.../services/orgFormSchemaService.js` fetch the `recruitment`-portal schema and feed `AddPosition.jsx`'s "Additional Details" section (`DynamicFieldRenderer.jsx`). Recruiter-entered values save as `dynamicFields` on the job position, later shown **read-only** to candidates in `candidatePreview/components/ApplicationForm.jsx`.

**The `candidate`-portal schema has no consuming UI yet** — there is no real candidate self-service application form anywhere in `RecruitmentPortal` (confirmed by search; the only candidate-related module, `candidatePreview`, is a recruiter-facing read-only display, not an input form). This remains the single largest gap: the data model and admin-side tooling are fully built for `candidate`-portal screens, but nothing renders them as actual inputs for a real candidate yet. Deferred until a genuine Candidate Portal codebase is available to work in.

## 8. Cross-Repo Identity Mismatch (real, unresolved in general — worked around per-feature)

Three different identity schemes are in play across the two repos:

| Concern | Identifier | Where it comes from |
|---|---|---|
| Dynamic Forms (`form-schemas` API) | `organizationCode` (SuperAdminPortal `organization.code`) | RecruitmentPortal already has this via `organization.code` in its own org config |
| Eligibility Configuration (`inclusions`, etc.) | `organizationId` (SuperAdminPortal's internal id) | RecruitmentPortal does **not** have this directly |
| RecruitmentPortal's own org identity | `orgSlug` (URL segment, `loginOrganizations.json`) | Static, no relation to SuperAdminPortal's ids |

**Resolved for the Inclusions checklist** (§9.3) via an existing-but-previously-unused mechanism: `RecruitmentPortal/src/modules/auth/services/organizationApiService.js` → `getOrganizationByCode(orgCode)` → `GET /organizations/by-code/{code}` against the SuperAdminPortal backend directly (`publicSuperAdminApi` instance, pointed at `REACT_APP_SUPER_ADMIN_API_URL`, the same host as SuperAdminPortal's own `REACT_APP_API_BASE_URL`). This already existed for login/org-theming (`organizationThemeService.js`) and was reused, not invented, to resolve `organizationId` from `orgCode` before calling the Inclusions endpoint.

**Known fragility**: this cross-origin call from the browser (RecruitmentPortal's origin → `172.16.2.11:8087` directly) is sensitive to the backend's self-signed TLS certificate not being trusted by the browser yet — surfaces as a generic axios "Network Error" / "CORS request did not succeed, status: null" until the certificate exception is accepted once per browser (visit the API URL directly, click through the warning). This same fragility silently affects the pre-existing login/org-theming call too — its `catch` block swallows failures and falls back to default theming, so a broken cert exception there degrades quietly instead of erroring visibly.

## 9. Inclusions — per-inclusion candidate schema (Eligibility Configuration)

**Business flow** (confirmed against explicit product requirements, after an earlier wrong implementation attempt was fully reverted — see §9.4):

```
Super Admin                     Recruiter                      Candidate
────────────                    ──────────                     ─────────
Configure Inclusion             Create Job Posting              Apply for Job
  → define its field schema       → see checkbox list of          → see only the inclusions
    (Certificate Number,            the org's Inclusions            the recruiter marked
     Issue Date, Authority,         (name only — never the           applicable
     Certificate Upload...)         candidate's fields)            → check the one(s) they
  → NOT entering data             → select which apply              claim
  → schema stored on the            to this job                   → THAT inclusion's schema
    Inclusion record              → save applicableInclusionIds       loads, they fill it in
                                     on the position                → submit
```

Recruiters **never** see or fill an Inclusion's candidate-facing fields — only a plain applicability checklist. This was an explicit, repeated correction during development; the architecture must not conflate the two.

### 9.1 Super Admin side (this repo)

`src/pages/EligibilityConfiguration/components/InclusionModal.js` — the Create/Edit/View Inclusion modal. Fields: Name, Age Relaxation, Description, then a **"Fields to Collect from Candidate"** section where the Super Admin builds the Inclusion's own field schema (Text / Date / File Upload / Dropdown), stored as `fields: [...]` on the Inclusion record, saved through the existing `createInclusion` / `updateInclusions` calls in `eligibilityApiService.js` (no API contract change needed there — the extra `fields` property just rides along in the same payload; **not yet confirmed the backend persists it** — same "unverified until checked in Network tab" caveat as Dynamic Forms had initially).

The original free-text **"Required Documents"** field was removed (was on the Inclusion record as `documents`, a single descriptive string). It became redundant once the Fields builder existed — a `file`-type field there (e.g. "Certificate Upload") does the same job properly, with its own label, instead of a loose text description nothing downstream ever rendered. Confirmed unused anywhere else (Inclusions list table, RecruitmentPortal's checklist, CandidatePortal's `InclusionClaims.js`) before removing.

`ageRelaxation` is deliberately **not** part of any field schema or shown in any UI — it's backend-only data used for eligibility calculation, resolved server-side via `inclusionId`.

### 9.2 Shared component: `FieldListEditor.js`

`src/pages/organizations/DynamicForms/FieldListEditor.js` — extracted from `FormFieldsBuilder.js` so both Dynamic Forms screens and per-Inclusion schemas use **one** field-editing implementation instead of two parallel ones (the first version of the Inclusions feature duplicated this logic inline in `InclusionModal.js`; corrected after explicit feedback to reuse the existing Dynamic Forms architecture). Controlled component: `{ fields, onChange, fieldTypes, disabled }`. `fieldTypes` defaults to Dynamic Forms' set (`DEFAULT_FIELD_TYPES`); `InclusionModal.js` passes its own narrower set (`Text, Date, File Upload, Dropdown`) since a `file` type only makes sense for candidate document uploads, not generic screen fields.

### 9.3 Recruiter side (RecruitmentPortal)

`AddPosition.jsx` — new **"Applicable Inclusions"** section (checkbox list, name only) above the existing Dynamic Forms "Additional Details" section. Backed by:
- `orgInclusionsApiService.js` — thin, one method (`getInclusions(organizationId)`), matching the established thin-object convention every other `*ApiService.js` in this repo follows (`jobPositionApiService.js`, `organizationApiService.js`).
- `orgInclusionsService.js` — orchestration layer: resolves `organizationId` via `organizationApiService.getOrganizationByCode(orgCode)` (§8), then calls `orgInclusionsApiService`, filters to `status === "Active"`.
- `useOrgInclusions.js` — hook, same `useParams()`-driven pattern as `useOrgFormSchema`.

Selected inclusion ids save as `applicableInclusionIds` on the job position payload, restored correctly when editing an existing position.

**Explicitly out of scope / not built**: recruiter verification of candidate-submitted inclusion data (Approve/Reject/Remarks) — confirmed not required for the current phase, and blocked anyway on candidate submissions existing, which they don't yet (§7.1, §9's candidate step).

### 9.4 History: the wrong first attempt (for context, fully reverted)

The first implementation attached Inclusions as a special `type: 'inclusion'` field *inside* the generic Dynamic Forms screen builder (`FormFieldsBuilder.js`), gated to `candidate`-portal screens, with a single flat `documents` string per inclusion rather than a real per-inclusion field schema. This was corrected after explicit product-requirement clarification: Inclusions needed (a) their own structured schema, not a flat string, and (b) a dedicated recruiter-side checklist entirely separate from the generic Dynamic Forms mechanism, not a field type within it. `FormFieldsBuilder.js` and `DynamicFieldRenderer.jsx` (RecruitmentPortal) were both reverted to remove all trace of the `inclusion` field type before the correct §9 implementation was built.
