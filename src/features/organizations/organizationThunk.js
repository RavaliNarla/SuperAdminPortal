import { createAsyncThunk } from "@reduxjs/toolkit";
import organizationApiService from "../../pages/organizations/services/ApiService.js";
import {
  mapOrganizations,
  mapEditOrganization,
  mapOrganizationList
} from "../../pages/organizations/mapper/mapper.js";

export const fetchOrganizations = createAsyncThunk(
  "organizations/fetchOrganizations",
  async (_, thunkAPI) => {
    try {
      const response = await organizationApiService.getOrganizations();

     return mapOrganizationList(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const createOrganization = createAsyncThunk(
  "organizations/createOrganization",
  async (payload, thunkAPI) => {
    try {
      const response =
        await organizationApiService.createOrganization(payload);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);


export const fetchOrganizationById = createAsyncThunk(
  "organizations/fetchOrganizationById",
  async (id, thunkAPI) => {
    try {
      const response =
        await organizationApiService.getOrganizationById(id);

      return mapEditOrganization(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);


export const updateOrganization = createAsyncThunk(
  "organizations/updateOrganization",
  async ({ id, payload }, thunkAPI) => {
    try {
      const response =
        await organizationApiService.updateOrganization(id, payload);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);