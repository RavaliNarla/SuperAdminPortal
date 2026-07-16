import axios from "axios";

// This matches RecruitmentPortal's `apis` instance (its REACT_APP_API_BASE_URLS,
// the master-portal base) — not RecruitmentPortal's `api` instance
// (REACT_APP_API_BASE_URL, the recruiter-portal base). The org-level
// form-schema endpoint lives on master-portal since it's shared across portals;
// see RecruitmentPortal's orgFormSchemaService.js, which calls `apis.get(...)`.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// No Authorization header is attached yet — SuperAdminPortal's own login flow
// (features/auth/authSlice.js) is still a mock `loggedIn` flag, not a real
// token. Add a request interceptor here once real auth exists, the way
// RecruitmentPortal's core/service/apiService.js does with MSAL.
api.interceptors.response.use((response) => response.data);

export { api };
