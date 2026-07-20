import { createAsyncThunk } from "@reduxjs/toolkit";
import eligibilityApiService from "../services/eligibilityApiService";

/* ===========================
   Vacancy & Marks Reservation
=========================== */

export const fetchVacancyAndMarksReservation = createAsyncThunk(
  "eligibility/fetchVacancyAndMarksReservation",
  async (organizationId, { rejectWithValue }) => {
    try {
      const response =
        await eligibilityApiService.getVacancyAndMarksReservation(
          organizationId
        );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* ===========================
   Categories & Age Relaxation
=========================== */

export const fetchCategoriesAndAgeRelaxations = createAsyncThunk(
  "eligibility/fetchCategoriesAndAgeRelaxations",
  async (organizationId, { rejectWithValue }) => {
    try {
      const response =
        await eligibilityApiService.getCategoriesAndAgeRelaxations(
          organizationId
        );

      return response.data; // <-- this is important
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchInclusions = createAsyncThunk(
  "eligibility/fetchInclusions",
  async (organizationId, { rejectWithValue }) => {
    try {
      const response = await eligibilityApiService.getInclusions(
        organizationId
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const createInclusion = createAsyncThunk(
  "eligibility/createInclusion",
  async ({ organizationId, payload }, { rejectWithValue, dispatch }) => {
    try {
      const response = await eligibilityApiService.createInclusion(
        organizationId,
        payload
      );

      // Refresh the list after successful creation
      dispatch(fetchInclusions(organizationId));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const updateInclusions = createAsyncThunk(
  "eligibility/updateInclusions",
  async ({ organizationId, payload }, { dispatch, rejectWithValue }) => {
    try {
      const response = await eligibilityApiService.updateInclusions(
        organizationId,
        payload
      );

      dispatch(fetchInclusions(organizationId));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchExclusions = createAsyncThunk(
  "eligibility/fetchExclusions",
  async (organizationId, { rejectWithValue }) => {
    try {
      const response = await eligibilityApiService.getExclusions(
        organizationId
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const createExclusion = createAsyncThunk(
  "eligibility/createExclusion",
  async ({ organizationId, payload }, { dispatch, rejectWithValue }) => {
    try {
      const response = await eligibilityApiService.createExclusion(
        organizationId,
        payload
      );

      dispatch(fetchExclusions(organizationId));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateExclusions = createAsyncThunk(
  "eligibility/updateExclusions",
  async ({ organizationId, payload }, { dispatch, rejectWithValue }) => {
    try {
      const response = await eligibilityApiService.updateExclusions(
        organizationId,
        payload
      );

      dispatch(fetchExclusions(organizationId));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchEducationExperienceValidation = createAsyncThunk(
  "eligibility/fetchEducationExperienceValidation",
  async (organizationId, { rejectWithValue }) => {
    try {
      const response =
        await eligibilityApiService.getEducationExperienceValidation(
          organizationId
        );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);
export const createEducationExperienceValidation = createAsyncThunk(
  "eligibility/createEducationExperienceValidation",
  async ({ organizationId, payload }, { dispatch, rejectWithValue }) => {
    try {
      const response =
        await eligibilityApiService.createEducationExperienceValidation(
          organizationId,
          payload
        );

      dispatch(fetchEducationExperienceValidation(organizationId));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const updateEducationExperienceValidation = createAsyncThunk(
  "eligibility/updateEducationExperienceValidation",
  async ({ organizationId, payload }, { dispatch, rejectWithValue }) => {
    try {
      const response =
        await eligibilityApiService.updateEducationExperienceValidation(
          organizationId,
          payload
        );

      dispatch(fetchEducationExperienceValidation(organizationId));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "eligibility/createCategory",
  async ({ organizationId, payload }, { dispatch, rejectWithValue }) => {
    try {
      const response =
        await eligibilityApiService.createCategoriesAndAgeRelaxations(
          organizationId,
          payload
        );

      dispatch(fetchCategoriesAndAgeRelaxations(organizationId));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCategories = createAsyncThunk(
  "eligibility/updateCategories",
  async ({ organizationId, payload }, { dispatch, rejectWithValue }) => {
    try {
      const response =
        await eligibilityApiService.updateCategoriesAndAgeRelaxations(
          organizationId,
          payload
        );

      dispatch(fetchCategoriesAndAgeRelaxations(organizationId));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);