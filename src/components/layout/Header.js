import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);

  return (
    <div className="d-flex justify-content-between align-items-center header-row">
      <div>
        <h1 className="h4 mb-0">RMS Super Admin Portal</h1>
        <p className="text-muted mb-0">Manage tenants, themes, and organization configuration.</p>
      </div>
      <div>
        {loggedIn ? (
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => dispatch(logout())}>
            Logout
          </button>
        ) : (
          <span className="badge bg-secondary">Super Admin</span>
        )}
      </div>
    </div>
  );
}
