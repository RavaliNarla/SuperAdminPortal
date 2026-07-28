import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getAuthenticationConfiguration = (organizationId) => {
  return axios.get(
    `${API_BASE_URL}/authentication/${organizationId}`,
    {
      headers: {
        Accept: "*/*",
        "X-Client": "Candidate",
      },
    }
  );
};

const createAuthenticationConfiguration = (organizationId, payload) => {
  return axios.post(
    `${API_BASE_URL}/authentication/${organizationId}`,
    payload,
    {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "X-Client": "Candidate",
      },
    }
  );
};

const updateAuthenticationConfiguration = (organizationId, payload) => {
  return axios.put(
    `${API_BASE_URL}/authentication/${organizationId}`,
    payload,
    {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "X-Client": "Candidate",
      },
    }
  );
};

export default {
  getAuthenticationConfiguration,
  createAuthenticationConfiguration,
  updateAuthenticationConfiguration,
};