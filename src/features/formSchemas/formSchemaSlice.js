import { createSlice } from '@reduxjs/toolkit';
import { formSchemas as initialFormSchemas } from '../../mock/formSchemas';

const initialState = {
  items: initialFormSchemas,
};

const formSchemaSlice = createSlice({
  name: 'formSchemas',
  initialState,
  reducers: {
    saveFormSchema(state, action) {
      const { organizationKey, portal, formKey, schema } = action.payload;
      if (!state.items[organizationKey]) {
        state.items[organizationKey] = {};
      }
      if (!state.items[organizationKey][portal]) {
        state.items[organizationKey][portal] = {};
      }
      state.items[organizationKey][portal][formKey] = schema;
    },
  },
});

export const { saveFormSchema } = formSchemaSlice.actions;
export default formSchemaSlice.reducer;
