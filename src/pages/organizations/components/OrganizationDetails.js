import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchOrganizationById } from "../../../features/organizations/organizationThunk";

export default function OrganizationDetails() {
  const { organizationId } = useParams();

  const dispatch = useAppDispatch();

  const { selectedOrganization: organization, loading } =
    useAppSelector((state) => state.organizations);

  useEffect(() => {
    if (organizationId) {
      dispatch(fetchOrganizationById(organizationId));
    }
  }, [dispatch, organizationId]);

  const contact = organization?.contact || {
    email: organization?.email,
    phone: organization?.phone,
    address: organization?.address,
  };

  const theme = organization?.theme || {
    primaryColor: organization?.primaryColor || '#0d6efd',
    secondaryColor: organization?.secondaryColor || '#6610f2',
  };

  const regional = organization?.regional || {
    timezone: organization?.timezone,
    language: organization?.language,
    currency: organization?.currency,
    dateFormat: organization?.dateFormat,
  };

  const statusLabel = useMemo(() => {
    return organization?.status === 'active' ? 'Active Tenant' : 'Inactive Tenant';
  }, [organization]);

  if (!organization) {
    if (loading) {
  return (
    <div className="card-bg card-body">
      <h5>Loading...</h5>
    </div>
  );
}
    return (
      <div className="card-bg card-body">
        <h2 className="h5 page-title">Organization not found</h2>
        <p>The organization you requested does not exist.</p>
        <Link to="/organizations" className="btn btn-outline-primary">
          Back to Organizations
        </Link>
      </div>
    );
  }

  return (
    <div className="card-bg card-body">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="h5 page-title">{organization.name}</h2>
          <p className="text-muted mb-1">{organization.description}</p>
          <span className={`badge ${organization.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
            {statusLabel}
          </span>
        </div>
        <div className="d-flex gap-2">
          <Link to={`/organizations/${organization.id}/dynamic-forms`} className="btn btn-outline-primary">
            Dynamic Forms
          </Link>
          <Link to={`/organizations/${organization.id}/edit`} className="btn btn-outline-secondary">
            Edit Organization
          </Link>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-lg-6">
          <div className="card-bg card-body">
            <h3 className="h6 mb-3">Organization Settings</h3>
            <dl className="row">
              <dt className="col-sm-5 text-muted">Domain</dt>
              <dd className="col-sm-7">{organization.domain}</dd>
              <dt className="col-sm-5 text-muted">Timezone</dt>
              <dd className="col-sm-7">{regional.timezone}</dd>
              <dt className="col-sm-5 text-muted">Language</dt>
              <dd className="col-sm-7">{regional.language}</dd>
              <dt className="col-sm-5 text-muted">Currency</dt>
              <dd className="col-sm-7">{regional.currency}</dd>
              <dt className="col-sm-5 text-muted">Date Format</dt>
              <dd className="col-sm-7">{regional.dateFormat}</dd>
            </dl>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card-bg card-body">
            <h3 className="h6 mb-3">Contact Information</h3>
            <dl className="row">
              <dt className="col-sm-5 text-muted">Email</dt>
              <dd className="col-sm-7">{contact.email}</dd>
              <dt className="col-sm-5 text-muted">Phone</dt>
              <dd className="col-sm-7">{contact.phone}</dd>
              <dt className="col-sm-5 text-muted">Address</dt>
              <dd className="col-sm-7">{contact.address}</dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="row gy-4 mt-3">
        <div className="col-lg-6">
          <div className="card-bg card-body">
            <h3 className="h6 mb-3">Branding</h3>
            <div className="mb-3 d-flex gap-3 align-items-center">
              <img src={organization.logoUrl} alt={`${organization.name} logo`} className="organization-logo" />
              <div>
                <p className="mb-1">Primary Color</p>
                <span className="badge" style={{ background: theme.primaryColor }}>
                  {theme.primaryColor}
                </span>
                <p className="mb-1 mt-3">Secondary Color</p>
                <span className="badge" style={{ background: theme.secondaryColor }}>
                  {theme.secondaryColor}
                </span>
              </div>
            </div>
            {organization.loginBackgroundUrl && (
              <div className="mt-3">
                <p className="mb-2">Login Background</p>
                <img src={organization.loginBackgroundUrl} alt="Login background" className="img-fluid rounded" style={{ maxHeight: '220px', width: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
