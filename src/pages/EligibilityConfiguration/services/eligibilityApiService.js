import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const eligibilityApiService = {
  getVacancyAndMarksReservation(organizationId) {
    return axios.get(
      `${API_BASE_URL}/eligibilityConfiguration/vacancy_and_marks_reservation/${organizationId}`,
      {
        headers: {
          Accept: "*/*",
          "X-Client": "Candidate",
        },
      },
    );
  },

  getCategoriesAndAgeRelaxations(organizationId) {
    return axios.get(
      `${API_BASE_URL}/eligibilityConfiguration/categories_and_age_relaxations/${organizationId}`,
      {
        headers: {
          Accept: "*/*",
          "X-Client": "Candidate",
        },
      },
    );
  },

  getInclusions(organizationId) {
    return axios.get(
      `${API_BASE_URL}/eligibilityConfiguration/inclusions/${organizationId}`,
      {
        headers: {
          Accept: "*/*",
          "X-Client": "Candidate",
        },
      },
    );
  },

  createInclusion(organizationId, payload) {
    return axios.post(
      `${API_BASE_URL}/eligibilityConfiguration/inclusions/${organizationId}`,
      payload,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "X-Client": "Candidate",
        },
      },
    );
  },

  updateInclusions(organizationId, payload) {
    return axios.put(
      `${API_BASE_URL}/eligibilityConfiguration/inclusions/${organizationId}`,
      payload,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "X-Client": "Candidate",
        },
      },
    );
  },

  getExclusions(organizationId) {
    return axios.get(
      `${API_BASE_URL}/eligibilityConfiguration/exclusions/${organizationId}`,
      {
        headers: {
          Accept: "*/*",
          "X-Client": "Candidate",
        },
      },
    );
  },

  createExclusion(organizationId, payload) {
    return axios.post(
      `${API_BASE_URL}/eligibilityConfiguration/exclusions/${organizationId}`,
      payload,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "X-Client": "Candidate",
        },
      },
    );
  },

  updateExclusions(organizationId, payload) {
    return axios.put(
      `${API_BASE_URL}/eligibilityConfiguration/exclusions/${organizationId}`,
      payload,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "X-Client": "Candidate",
        },
      },
    );
  },
};

export default eligibilityApiService;
