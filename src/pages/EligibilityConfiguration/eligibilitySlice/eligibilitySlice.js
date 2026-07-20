import { createSlice } from "@reduxjs/toolkit";

import {
  fetchVacancyAndMarksReservation,
  fetchCategoriesAndAgeRelaxations,
  fetchInclusions,
  createInclusion,
  fetchExclusions,
  createExclusion,
  updateExclusions,
  fetchEducationExperienceValidation,
  createEducationExperienceValidation,
  updateEducationExperienceValidation,
  createCategory,
  updateCategories,
} from "../Thunk/eligibilityThunk";

const initialState = {
  selectedOrganization: "",

  vacancyReservation: null,

  categoriesAndAgeRelaxations: [],

  inclusions: [],
  exclusions: [],
  educationExperienceValidation: null,

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
      })

      .addCase(fetchEducationExperienceValidation.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchEducationExperienceValidation.fulfilled,
        (state, action) => {
          state.loading = false;
          state.educationExperienceValidation = action.payload.data;
        },
      )

      .addCase(fetchEducationExperienceValidation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createEducationExperienceValidation.pending, (state) => {
        state.loading = true;
      })

      .addCase(createEducationExperienceValidation.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(
        createEducationExperienceValidation.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      .addCase(updateEducationExperienceValidation.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateEducationExperienceValidation.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(
        updateEducationExperienceValidation.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCategories.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCategories.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedOrganization } = eligibilitySlice.actions;

export default eligibilitySlice.reducer;
