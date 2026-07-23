import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../../css/Sidebar.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const menus = [
    {
      name: "Dashboard",
      icon: "bi-grid",
      path: "/dashboard",
    },
    {
      name: "Organization",
      icon: "bi bi-buildings",
      path: "/organizations",
    },
    {
      name: "Admin",
      icon: "bi-people",
      path: "/admin",
    },
    {
      name: "Roles & Privileges",
      icon: "bi-shield",
      path: "/Roles & Privileges",
    },
    {
      name: "Authentication",
      icon: "bi-shield-lock",
      path: "/authentication-configuration",
    },
    {
      name: "Permissions",
      icon: "bi-lock",
      path: "/permissions",
    },
    {
      name: "Site Configuration",
      icon: "bi-gear",
      path: "/site-configuration",
    },
    // {
    //   name: "Overview",
    //   icon: "bi bi-speedometer2",
    //   path: "/eligibility-overview",
    // },
    {
      name: "Eligibility Configuration",
      icon: "bi bi-card-checklist",
       path: "/eligibility-configuration/categories",
    },
    // {
    //   name: "Validation Workflow",
    //   icon: "bi bi-bar-chart-line",
    //   path: "/validation-workflow",
    // },
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={() => {
              const isEligibility =
                menu.path === "/eligibility-configuration" &&
                location.pathname.startsWith("/eligibility-configuration");

              const isValidation =
                menu.path === "/validation-workflow" &&
                location.pathname.startsWith("/validation-workflow");

              const isOverview =
                menu.path === "/eligibility-overview" &&
                location.pathname.startsWith("/eligibility-overview");

              const active =
                isEligibility ||
                isValidation ||
                isOverview ||
                location.pathname === menu.path;

              return active ? "menu-item active" : "menu-item";
            }}
            onClick={() => {
              if (window.innerWidth < 992) {
                setSidebarOpen(false);
              }
            }}
          >
            <i className={`bi ${menu.icon}`}></i>
            <span>{menu.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
// export default function Sidebar() {
//   return (
//     <aside className="sidebar d-flex flex-column p-4">
//       <div className="mb-5">
//         <div className="mb-3">
//           <span className="fs-5 fw-semibold">RMS Super Admin</span>
//         </div>
//         <p className="small text-muted">Tenant configuration for enterprise recruitment operations.</p>
//       </div>
//       <nav className="nav flex-column gap-2">
//         <NavLink className={({ isActive }) => `nav-link px-3 py-2 rounded ${isActive ? 'bg-white text-dark' : ''}`} to="/organizations">
//           <i className="bi bi-building me-2"></i>
//           Organizations
//         </NavLink>
//       </nav>

//     </aside>
//   );
// }
