import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Login from "../src/pages/authentication/Login";
import OrganizationDetails from "../src/pages/organizations/components/OrganizationDetails";
import OrganizationForm from "../src/pages/organizations/components/OrganizationForm";
import OrganizationList from "../src/pages/organizations/components/OrganizationList";
import { useAppSelector } from "./app/hooks";
import AuthenticationConfiguration from "./pages/AuthenticationConfiguration/AuthenticationConfiguration";
import EligibilityConfiguration from "./pages/EligibilityConfiguration/EligibilityConfiguration";

import CategoriesAgeRelaxation from "./pages/EligibilityConfiguration/components/CategoriesAgeRelaxation";
import Inclusions from "./pages/EligibilityConfiguration/components/Inclusions";
import EducationExperience from "./pages/EligibilityConfiguration/components/EducationExperience";
import Exclusions from "./pages/EligibilityConfiguration/components/Exclusions";
import VacancyBreakdown from "./pages/EligibilityConfiguration/components/VacancyBreakdown";
import ValidationWorkflow from "./pages/ValidationWorkflow/ValidationWorkflow";
import DynamicFormsHome from "./pages/organizations/DynamicForms/DynamicFormsHome";
import EligibilityOverview from "./pages/EligibilityOverview/Overview";
import DashboardList from "../src/pages/dashboard/dashboardOverview";
import RolesManagementApp from "../src/pages/Admin/RolesManagement"

import { Toaster } from "react-hot-toast";
function ProtectedLayout() {
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#2d3748",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            padding: "14px 18px",
            minWidth: "360px",
            boxShadow: "0 10px 30px rgba(24,145,208,0.15)",
            fontWeight: "500",
            fontSize: "14px",
          },

          success: {
            style: {
              borderLeft: "5px solid #1891d0",
            },
          },

          error: {
            style: {
              borderLeft: "5px solid #ef4444",
            },
          },
        }}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Navigate to="/organizations" replace />} />
          <Route path="/organizations" element={<OrganizationList />} />
          <Route path="/organizations/new" element={<OrganizationForm />} />
          <Route
            path="/organizations/:organizationId/edit"
            element={<OrganizationForm />}
          />
          <Route
            path="/organizations/:organizationId"
            element={<OrganizationDetails />}
          />
          <Route path="/dashboard" element={<DashboardList />} />
          <Route path="/admin" element={<RolesManagementApp />} />
          {/* Eligibility Configuration */}
          <Route
            path="/eligibility-configuration"
            element={<EligibilityConfiguration />}
          >
            <Route index element={<CategoriesAgeRelaxation />} />
            <Route path="categories" element={<CategoriesAgeRelaxation />} />
            <Route path="inclusions" element={<Inclusions />} />
            <Route
              path="education-experience"
              element={<EducationExperience />}
            />
            <Route path="exclusions" element={<Exclusions />} />
            <Route path="vacancy-breakdown" element={<VacancyBreakdown />} />
          </Route>
          {/* <Route path="/validation-workflow" element={<ValidationWorkflow />} /> */}
          {/* <Route
            path="/eligibility-overview"
            element={<EligibilityOverview />}
        /> */}

          <Route
            path="/organizations/:organizationId/dynamic-forms"
            element={<DynamicFormsHome />}
          />
          <Route
            path="/authentication-configuration"
            element={<AuthenticationConfiguration />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
