import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Login from './pages/Login';
import OrganizationDetails from './pages/organizations/OrganizationDetails';
import OrganizationForm from './pages/organizations/OrganizationForm';
import OrganizationList from './pages/organizations/OrganizationList';
import { useAppSelector } from './app/hooks';
import AuthenticationConfiguration from "./pages/organizations/AuthenticationConfiguration";

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
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Navigate to="/organizations" replace />} />
        <Route path="/organizations" element={<OrganizationList />} />
        <Route path="/organizations/new" element={<OrganizationForm />} />
        <Route path="/organizations/:organizationId/edit" element={<OrganizationForm />} />
        <Route path="/organizations/:organizationId" element={<OrganizationDetails />} />
        <Route
          path="/authentication-configuration"
          element={<AuthenticationConfiguration />}
        />
      </Route>

    </Routes>
  );
}

export default App;
