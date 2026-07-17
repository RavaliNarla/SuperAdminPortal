import { createSlice } from "@reduxjs/toolkit";
import {
  fetchVacancyAndMarksReservation,
  fetchCategoriesAndAgeRelaxations,
} from "./eligibilityThunk";

const initialState = {
  vacancyReservation: null,

  categoriesAndAgeRelaxations: null,

  loading: false,

  error: null,
};

const eligibilitySlice = createSlice({
  name: "eligibility",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ===========================
         Vacancy & Marks Reservation
      ============================ */

      .addCase(
        fetchVacancyAndMarksReservation.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchVacancyAndMarksReservation.fulfilled,
        (state, action) => {
          state.loading = false;
          state.vacancyReservation = action.payload;
        }
      )

      .addCase(
        fetchVacancyAndMarksReservation.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      /* ===========================
         Categories & Age Relaxation
      ============================ */

      .addCase(
        fetchCategoriesAndAgeRelaxations.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchCategoriesAndAgeRelaxations.fulfilled,
        (state, action) => {
          state.loading = false;
          state.categoriesAndAgeRelaxations =
            action.payload;
        }
      )

      .addCase(
        fetchCategoriesAndAgeRelaxations.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default eligibilitySlice.reducer;