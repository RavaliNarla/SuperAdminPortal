import { api } from "../core/service/apiService";

// Matches the real backend contract (see Swagger):
//   GET/PUT /organizations/{organizationCode}/form-schemas?screen={screenId}
// `screenId` is the screen's `id` (uuid) from GET /portalScreens, not its
// screenKey. `fields` travels as a JSON-encoded string, not a nested array —
// our `api` instance always sets Content-Type: application/json, so axios's
// default transformRequest will JSON.stringify whatever we pass even if it's
// already a string; passing JSON.stringify(fields) here produces the
// double-encoded string body the backend expects.
function schemaPath(organizationCode) {
  return `/organizations/${encodeURIComponent(organizationCode)}/form-schemas`;
}

const formSchemaApiService = {
  getFormSchema: (organizationCode, screenId) =>
    api.get(schemaPath(organizationCode), { params: { screen: screenId } }),

  saveFormSchema: (organizationCode, screenId, fields) =>
    api.put(schemaPath(organizationCode), JSON.stringify(fields), {
      params: { screen: screenId },
    }),
};

export default formSchemaApiService;
