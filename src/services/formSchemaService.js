import { store } from '../app/store';
import { saveFormSchema as saveFormSchemaAction } from '../features/formSchemas/formSchemaSlice';
import formSchemaApiService from './formSchemaApiService';

// TEMPORARY FALLBACK — remove once the real backend endpoints
// (see docs/dynamic-forms-backend-spec.md) are live. Until then, calls hit
// formSchemaApiService first; on failure (endpoint not implemented yet, or no
// backend running locally) fall back to the local Redux mock store so the
// Dynamic Forms UI keeps working end-to-end for local development. Mirrors
// the fallback pattern in the Recruitment Portal's orgFormSchemaService.js.

export async function fetchFormSchema(organizationKey, portal, formKey, screenId) {
  try {
    const body = await formSchemaApiService.getFormSchema(organizationKey, screenId);
    // The backend has been observed returning `fields` as a real array; the
    // Swagger doc's generic "string" type doesn't match that in practice, but
    // parse defensively in case some screen/environment does send it as a
    // JSON-encoded string.
    const rawFields = body?.data?.fields;
    const fields = Array.isArray(rawFields)
      ? rawFields
      : typeof rawFields === 'string' && rawFields
        ? JSON.parse(rawFields)
        : null;
    if (fields) return { fields };
  } catch {
    // endpoint not live yet, or no schema saved for this screen — fall through to mock
  }
  return store.getState().formSchemas.items[organizationKey]?.[portal]?.[formKey] ?? null;
}

export async function saveFormSchema(organizationKey, portal, formKey, schema, screenId) {
  try {
    return await formSchemaApiService.saveFormSchema(organizationKey, screenId, schema.fields);
  } catch {
    store.dispatch(saveFormSchemaAction({ organizationKey, portal, formKey, schema }));
    return schema;
  }
}
