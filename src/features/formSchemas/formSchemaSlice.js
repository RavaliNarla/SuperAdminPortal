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
      const { organizationKey, formKey, schema } = action.payload;
      if (!state.items[organizationKey]) {
        state.items[organizationKey] = {};
      }
      state.items[organizationKey][formKey] = schema;
    },
  },
});

export const { saveFormSchema } = formSchemaSlice.actions;
export default formSchemaSlice.reducer;
