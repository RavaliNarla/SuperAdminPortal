import { store } from '../app/store';
import { saveFormSchema as saveFormSchemaAction } from '../features/formSchemas/formSchemaSlice';

// Backend team: replace the bodies of these two functions with real HTTP calls
// (e.g. axios GET/PUT `/organizations/{organizationKey}/form-schema/{formKey}`,
// where organizationKey is the organization's slug — the same key used in the
// Recruitment Portal's login URL, e.g. "bob").
// Call sites only depend on the Promise-based signatures below, not on Redux.

export async function fetchFormSchema(organizationKey, formKey) {
  const schema = store.getState().formSchemas.items[organizationKey]?.[formKey] ?? null;
  return schema;
}

export async function saveFormSchema(organizationKey, formKey, schema) {
  store.dispatch(saveFormSchemaAction({ organizationKey, formKey, schema }));
  return schema;
}
