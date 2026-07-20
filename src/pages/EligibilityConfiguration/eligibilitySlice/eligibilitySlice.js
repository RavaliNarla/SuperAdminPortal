import { createSlice } from "@reduxjs/toolkit";

import {
  fetchVacancyAndMarksReservation,
  fetchCategoriesAndAgeRelaxations,
  fetchInclusions,
  createInclusion,
  fetchExclusions,
  createExclusion,
  updateExclusions,
} from "../Thunk/eligibilityThunk";

const initialState = {
  selectedOrganization: "",

  vacancyReservation: null,

  categoriesAndAgeRelaxations: [],

  inclusions: [],
  exclusions: [],

  loading: false,

  error: null,
};

const eligibilitySlice = createSlice({
  name: "eligibility",

  initialState,

  reducers: {
    setSelectedOrganization(state, action) {
      state.selectedOrganization = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===========================
         Vacancy & Marks Reservation
      ============================ */

      .addCase(fetchVacancyAndMarksReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchVacancyAndMarksReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.vacancyReservation = action.payload;
      })

      .addCase(fetchVacancyAndMarksReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===========================
         Categories & Age Relaxation
      ============================ */

      .addCase(fetchCategoriesAndAgeRelaxations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategoriesAndAgeRelaxations.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload.data;

        state.categoriesAndAgeRelaxations = Array.isArray(data)
          ? data
          : data
            ? [data]
            : [];
      })

      .addCase(fetchCategoriesAndAgeRelaxations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchInclusions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchInclusions.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload.data;

        state.inclusions = Array.isArray(data) ? data : data ? [data] : [];
      })
      .addCase(createInclusion.pending, (state) => {
        state.loading = true;
      })

      .addCase(createInclusion.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createInclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchInclusions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchExclusions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchExclusions.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload.data;

        state.exclusions = Array.isArray(data) ? data : data ? [data] : [];
      })

      .addCase(fetchExclusions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createExclusion.pending, (state) => {
        state.loading = true;
      })

      .addCase(createExclusion.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createExclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateExclusions.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateExclusions.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateExclusions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedOrganization } = eligibilitySlice.actions;

export default eligibilitySlice.reducer;
