import { api } from "../core/service/apiService";

const formSchemaApiService = {
  getFormSchema: (organizationKey, portal, formKey) =>
    api.get(`/organizations/${organizationKey}/${portal}/form-schema/${formKey}`),

  saveFormSchema: (organizationKey, portal, formKey, schema) =>
    api.put(
      `/organizations/${organizationKey}/${portal}/form-schema/${formKey}`,
      schema
    ),
};

export default formSchemaApiService;
