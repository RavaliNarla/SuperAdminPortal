import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const organizationApiService = {
  getOrganizations() {
    return axios.get(`${API_BASE_URL}/organizations`, {
      headers: {
        Accept: "*/*",
        "X-Client": "Candidate",
      },
    });
  },

  createOrganization(payload) {
    return axios.post(
      `${API_BASE_URL}/organizations`,
      payload,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "X-Client": "Candidate",
        },
      }
    );
  },

  getOrganizationById(id) {
  return axios.get(
    `${API_BASE_URL}/organizations/${id}`,
    {
      headers: {
        Accept: "*/*",
        "X-Client": "Candidate",
      },
    }
  );
},

updateOrganization(id, payload) {
  return axios.put(
    `${API_BASE_URL}/organizations/${id}`,
    payload,
    {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "X-Client": "Candidate",
      },
    }
  );
},
};

export default organizationApiService;