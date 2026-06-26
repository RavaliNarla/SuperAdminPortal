import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/auth/authSlice';

const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'password',
};

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      dispatch(login());
      navigate('/organizations');
      return;
    }

    setError('Invalid username or password. Use admin / password');
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: '380px' }}>
        <div className="card-body">
          <h2 className="h5 mb-3">Super Admin Login</h2>
          <p className="text-muted mb-4">Enter static credentials to access organization management.</p>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <div className="mt-3 text-muted small">
            Use <strong>admin</strong> / <strong>password</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
