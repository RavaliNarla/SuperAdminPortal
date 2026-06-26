import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar d-flex flex-column p-4">
      <div className="mb-5">
        <div className="mb-3">
          <span className="fs-5 fw-semibold">RMS Super Admin</span>
        </div>
        <p className="small text-muted">Tenant configuration for enterprise recruitment operations.</p>
      </div>
      <nav className="nav flex-column gap-2">
        <NavLink className={({ isActive }) => `nav-link px-3 py-2 rounded ${isActive ? 'bg-white text-dark' : ''}`} to="/organizations">
          <i className="bi bi-building me-2"></i>
          Organizations
        </NavLink>
      </nav>
    </aside>
  );
}
