# SuperAdminPortal — Architecture Reference

> Purpose: a from-scratch architecture doc for this repo, written by reading the codebase directly (no prior doc existed here). Covers tech stack, bootstrap/routing, state/API layers, module inventory, and the org-level Dynamic Forms feature, including how it integrates with the sibling `RecruitmentPortal` repo.

## 1. Tech Stack

- **React 18.2**, **Create React App** (`react-scripts 5.0.1`) — no TypeScript, no Vite/Next.
- **react-router-dom 7.10.1** — routing, flat (no org-slug URL segment, unlike `RecruitmentPortal`).
- **@reduxjs/toolkit 2.11.1** + **redux-persist 6** — state, persisted to `localStorage` under key `"rms-super-admin"`.
- **axios 1.13.2** — HTTP client. Two independent axios setups exist side by side (see §5) — not yet unified.
- **react-bootstrap 2.10 / bootstrap 5.3 / bootstrap-icons**, plus **@mui/material 7**, **@fortawesome**, **react-feather**, **react-icons** — several icon/UI libraries mixed in.
- **react-i18next 12** is a dependency but not wired into any page found in this pass (no `i18n.js` bootstrap like `RecruitmentPortal`'s).
- `package.json` name is still the CRA default-ish `"bob_app"`. No `.env` files inspected in this pass — `REACT_APP_API_BASE_URL` is read directly via `process.env`.

## 2. App Bootstrap & Routing

**`src/App.js`** — a single flat `<Routes>` tree, no org-slug prefix. `ProtectedLayout` gates every route behind `state.auth.loggedIn` (a plain boolean, see §3) and wraps them in `AppShell` (Header + `Sidebar`).

Routes actually registered: `/login`, `/organizations`, `/organizations/new`, `/organizations/:organizationId/edit`, `/organizations/:organizationId`, `/organizations/:organizationId/dynamic-forms`, `/eligibility-configuration/*` (nested: `categories`, `inclusions`, `education-experience`, `exclusions`, `vacancy-breakdown`), `/validation-workflow`, `/eligibility-overview`, `/authentication-configuration`.

**`src/components/layout/Sidebar.js`** lists more menu items than routes exist for: `Dashboard` (`/dashboard`), `Admin` (`/admin`), `Roles & Privileges`, `Permissions` (`/permissions`), `Site Configuration` (`/site-configuration`) have no matching `<Route>` in `App.js` — these currently 404 into whatever the router's fallback does (there is no catch-all route either, so they render nothing under `AppShell`).

## 3. Authentication

**Not real auth yet.** `src/pages/Login.js` checks hardcoded credentials (`admin` / `password`) client-side and dispatches `login()` on `authSlice` (`{ loggedIn: boolean }`, [authSlice.js](src/features/auth/authSlice.js)). No token, no user identity, no role/privilege model — `ProtectedLayout` only checks the boolean. `core/service/apiService.js` explicitly notes no `Authorization` header is attached yet, pending real auth.

## 4. State Management (Redux Toolkit + redux-persist)

**`src/app/store.js`** — `combineReducers({ organizations, auth, formSchemas })`, wrapped in `redux-persist` (`localStorage`, key `"rms-super-admin"`).

- **`organizations`** ([orgSlice.js](src/features/organizations/orgSlice.js)): `{ items: [], selectedOrganization: null, loading, error }`. `items` is populated only by dispatching `fetchOrganizations` (done once, in `OrganizationList.js`); every other screen that needs org data reads it back out of `items` via selectors rather than fetching itself (see §6.1 and the Dynamic Forms flow below). `selectedOrganization` is populated separately by `fetchOrganizationById` but isn't used by `DynamicFormsHome`.
- **`auth`** ([authSlice.js](src/features/auth/authSlice.js)): just `{ loggedIn }`.
- **`formSchemas`** ([formSchemaSlice.js](src/features/formSchemas/formSchemaSlice.js)): local mock store for Dynamic Forms schemas, seeded from `src/mock/formSchemas.js`, keyed `items[organizationKey][portal][formKey]`. Acts as a fallback when the real backend endpoint isn't available (see §7).

## 5. API Layer — two parallel setups

Unlike `RecruitmentPortal`'s single shared `core/service/apiService.js` with seven named instances and an auth interceptor, this repo has **two independent axios setups** that both exist today:

| File | Style | Used by |
|---|---|---|
| [`src/core/service/apiService.js`](src/core/service/apiService.js) | one `axios.create()` instance (`api`), response interceptor unwraps `response.data`, no auth header yet | `formSchemaApiService.js` |
| [`src/pages/organizations/services/ApiService.js`](src/pages/organizations/services/ApiService.js) | raw `axios.get/post/put` calls per method, manual headers each time, **no response unwrapping** (callers do `response.data`) | all organization CRUD (`organizationThunk.js`) |

Both read `REACT_APP_API_BASE_URL` from `process.env`. Worth unifying before adding more API modules — a third module would otherwise have to guess which pattern to copy.

## 6. Module Inventory

### 6.1 `organizations`

CRUD for tenant orgs: `OrganizationList` (dispatches `fetchOrganizations` on mount — the only place that populates `organizations.items`), `OrganizationForm` (create/edit), `OrganizationDetails`, plus sub-sections for `AuthenticationConfiguration` and `CandidateLoginSection` (Aadhaar/Email/Mobile/PAN/OTP/username/password-recovery config components under `components/candidate-login/`). `mapper/mapper.js` translates between API shape and UI shape (`mapOrganizationList`, `mapEditOrganization`).

### 6.2 `EligibilityConfiguration` / `EligibilityOverview` / `ValidationWorkflow` / `HeaderEligibility`

Each is a self-contained mini-module with its own `services/`, `mapper/`, and either a Redux slice+thunk (`EligibilityConfiguration/eligibilitySlice/`, `Thunk/eligibilityThunk.js`) or local hooks (`useEligibilityOverview.js`, `useValidationWorkflow.js`, `useEligibilityHeader.js`) — not wired into the root `store.js`, so `EligibilityConfiguration`'s slice is presumably combined locally or the feature manages its own state outside Redux (not confirmed in this pass — check `eligibilitySlice.js`'s own store wiring if touching this area).

### 6.3 `DynamicForms` — org-level configurable extra fields

Covered in detail in §7 — this is the newest, most cross-repo-coupled feature.

## 7. Dynamic Forms — full flow and cross-repo contract

**Purpose**: let a super-admin define extra fields (beyond the fixed schema) per organization, per target portal (`recruitment` today; `candidate` is scaffolded but unused — see below), per form (`requisition`, `jobPosting`).

**Entry point**: `src/pages/organizations/DynamicForms/DynamicFormsHome.js`, routed at `/organizations/:organizationId/dynamic-forms`.

```
organizationId (URL param)
  → useAppSelector: state.organizations.items.find(org => org.id === organizationId)
      ⚠ depends on `items` already being populated (see §4/§6.1) — no fetch happens here
  → organizationKey = organization.code || organization.id
  → user picks a form from CONFIGURABLE_FORMS (currently: requisition + jobPosting, both portal:'recruitment')
  → <FormFieldsBuilder organizationKey portal formKey>
```

**`FormFieldsBuilder.js`** — a field-list editor (`text` / `dropdown` / `date` / `checkbox` types, each with `id`/`label`/`required` + type-specific props). On mount calls `fetchFormSchema`, on Save calls `saveFormSchema` — both from `src/services/formSchemaService.js`:

```
fetchFormSchema(orgKey, portal, formKey)
  1. try formSchemaApiService.getFormSchema → GET /organizations/{orgKey}/{portal}/form-schema/{formKey}
  2. if that throws (endpoint not live) → fall back to Redux formSchemas.items[orgKey][portal][formKey] (mock)

saveFormSchema(orgKey, portal, formKey, schema)
  1. try formSchemaApiService.saveFormSchema → PUT same URL
  2. if that throws → dispatch saveFormSchema into the local formSchemas slice (mock, not persisted server-side)
```

This API-first-then-mock-fallback pattern deliberately mirrors `RecruitmentPortal`'s `orgFormSchemaService.js` (see below) so the UI keeps working end-to-end before the real backend endpoint exists.

### 7.1 Consumption on the RecruitmentPortal side (cross-repo)

`RecruitmentPortal/src/modules/jobPosting/hooks/useOrgFormSchema.js` + `.../services/orgFormSchemaService.js` fetch `GET /organizations/{orgSlug}/recruitment/form-schema/{formKey}` and feed `AddPosition.jsx`'s "Additional Details" section (`FormBuilderModal` / `DynamicFieldRenderer`). Values the recruiter fills in are saved as `dynamicFields` on the job position.

Those same `dynamicFields` (schema + submitted values) are later shown **read-only** to candidates in `RecruitmentPortal/src/modules/candidatePreview/components/ApplicationForm.jsx` (the "Additional Details" accordion) — candidates see what the recruiter entered, they don't fill in their own dynamic fields.

### 7.2 ⚠ Known gaps / risks in this feature

- **Key-space mismatch risk**: `DynamicFormsHome` computes `organizationKey = organization.code || organization.id` (an org record created here in SuperAdminPortal). `RecruitmentPortal` looks the schema up by `orgSlug`, which comes from its own **static** `loginOrganizations.json` config (`default`/`sagarsoft`/`bob`/`pnb`), not from this API. **These two values must be kept in sync manually** — `DynamicFormsHome.js` already renders a warning when an org has no `code` set, for exactly this reason.
- **`candidate` portal is scaffolded but dead**: `PORTALS` in `DynamicFormsHome.js` includes `{ key: 'candidate', label: 'Candidate Portal' }` and the `<select>` groups by it, but `CONFIGURABLE_FORMS` never defines a form with `portal: 'candidate'`, so that optgroup always renders empty. Nothing on the `RecruitmentPortal`/candidate side calls `getOrgFormSchema(orgSlug, 'candidate', ...)` either — there's no code path today where a candidate fills in their own admin-defined dynamic field, only the read-only display described in §7.1.
- Debug `console.log` calls left in `DynamicFormsHome.js` (`orga`, `selectedForm`, ids) and `FormFieldsBuilder.js` (`handleSave`) — harmless but worth stripping before shipping.
- `formSchemaSlice`'s mock fallback is **not** shared across browser tabs/sessions server-side — it only persists via `redux-persist` to the current browser's `localStorage`, so "saved" schemas via the mock path won't be visible to `RecruitmentPortal` (a different origin/app) at all; only the real API path bridges the two repos.

## 8. Cross-Repo Relationship Summary

| Concern | SuperAdminPortal | RecruitmentPortal |
|---|---|---|
| Org identity | Redux `organizations.items[].id` / `.code` | URL `:orgSlug`, keyed in static `loginOrganizations.json` |
| Form schema endpoint | `PUT/GET /organizations/{orgKey}/{portal}/form-schema/{formKey}` (`formSchemaApiService.js`) | `GET /organizations/{orgSlug}/recruitment/form-schema/{formKey}` (`orgFormSchemaService.js`) — same URL shape, portal hardcoded to `"recruitment"` |
| Fallback when endpoint is missing | Redux `formSchemas` mock slice, seeded from `src/mock/formSchemas.js` | Hardcoded `DEMO_SCHEMAS` object keyed by org slug, inline in `orgFormSchemaService.js` |

Both repos independently implemented the same "hit the real endpoint, silently fall back to local demo data on failure" pattern — a sign the backend contract (`/organizations/{key}/{portal}/form-schema/{formKey}`) is agreed but not yet implemented server-side.
