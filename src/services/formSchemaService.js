import { store } from '../app/store';
import { saveFormSchema as saveFormSchemaAction } from '../features/formSchemas/formSchemaSlice';
import formSchemaApiService from './formSchemaApiService';

// TEMPORARY FALLBACK — remove once the real backend endpoints
// (see docs/dynamic-forms-backend-spec.md) are live. Until then, calls hit
// formSchemaApiService first; on failure (endpoint not implemented yet, or no
// backend running locally) fall back to the local Redux mock store so the
// Dynamic Forms UI keeps working end-to-end for local development. Mirrors
// the fallback pattern in the Recruitment Portal's orgFormSchemaService.js.

export async function fetchFormSchema(organizationKey, portal, formKey) {
  try {
    const schema = await formSchemaApiService.getFormSchema(organizationKey, portal, formKey);
    if (schema?.fields) return schema;
  } catch {
    // endpoint not live yet — fall through to mock
  }
  return store.getState().formSchemas.items[organizationKey]?.[portal]?.[formKey] ?? null;
}

export async function saveFormSchema(organizationKey, portal, formKey, schema) {
  try {
    return await formSchemaApiService.saveFormSchema(organizationKey, portal, formKey, schema);
  } catch {
    store.dispatch(saveFormSchemaAction({ organizationKey, portal, formKey, schema }));
    return schema;
  }
}
