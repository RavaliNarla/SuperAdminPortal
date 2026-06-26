import { createSlice, nanoid } from '@reduxjs/toolkit';
import { organizations as initialOrganizations } from '../../mock/organizations';

const initialState = {
  items: initialOrganizations,
};

const orgSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    addOrganization: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(organization) {
        return {
          payload: {
            id: nanoid(),
            ...organization,
          },
        };
      },
    },
    updateOrganization(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = { ...state.items[index], ...action.payload.changes };
      }
    },
    toggleOrganizationStatus(state, action) {
      const organization = state.items.find((item) => item.id === action.payload.id);
      if (organization) {
        organization.status = organization.status === 'active' ? 'inactive' : 'active';
      }
    },
  },
});

export const { addOrganization, updateOrganization, toggleOrganizationStatus } = orgSlice.actions;
export default orgSlice.reducer;
