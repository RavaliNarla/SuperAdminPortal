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
};

export default eligibilityApiService;
