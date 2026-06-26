import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleOrganizationStatus } from '../../features/organizations/orgSlice';

export default function OrganizationList() {
  const organizations = useAppSelector((state) => state.organizations.items);
  const dispatch = useAppDispatch();

  return (
    <div className="card-bg card-body">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h5 page-title">Organization Management</h2>
          <p className="text-muted mb-0">Overview of active and inactive tenants.</p>
        </div>
        <Link to="/organizations/new" className="btn btn-primary">
          New Organization
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Domain</th>
              <th>Timezone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org) => {
              const domainValue = org.domain || org.code || '—';
              const timezoneValue = org.timezone || org.regional?.timezone || 'Unknown';
              const statusValue = org.status || org.subscription?.status || 'inactive';

              return (
                <tr key={org.id}>
                  <td>{org.name}</td>
                  <td>{domainValue}</td>
                  <td>{timezoneValue}</td>
                  <td>
                    <span className={`badge ${statusValue === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                      {statusValue}
                    </span>
                  </td>
                  <td className="table-actions">
                    <Link to={`/organizations/${org.id}`} className="btn btn-sm btn-outline-primary me-2">
                      Details
                    </Link>
                    <Link to={`/organizations/${org.id}/edit`} className="btn btn-sm btn-outline-secondary me-2">
                      Edit
                    </Link>
                    <button
                      type="button"
                      className={`btn btn-sm ${statusValue === 'active' ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => dispatch(toggleOrganizationStatus({ id: org.id }))}
                    >
                      {statusValue === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
