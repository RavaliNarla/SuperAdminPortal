import { createSlice, nanoid } from "@reduxjs/toolkit";
import {
  fetchOrganizations,
  createOrganization,
  fetchOrganizationById,
} from "../hooks/organizationThunk";

const initialState = {
  items: [],
  selectedOrganization: null,
  loading: false,
  error: null,
};

const orgSlice = createSlice({
  name: "organizations",
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
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index >= 0) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.changes,
        };
      }
    },

    toggleOrganizationStatus(state, action) {
      const organization = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (organization) {
        organization.status =
          organization.status === "active"
            ? "inactive"
            : "active";
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // ===========================
      // GET ORGANIZATIONS
      // ===========================
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===========================
      // CREATE ORGANIZATION
      // ===========================
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loading = false;

        // Push newly created organization if API returns it
        if (action.payload?.data) {
          state.items.push(action.payload.data);
        }
      })

      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOrganizationById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchOrganizationById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrganization = action.payload;
      })

      .addCase(fetchOrganizationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addOrganization,
  updateOrganization,
  toggleOrganizationStatus,
} = orgSlice.actions;

export default orgSlice.reducer;