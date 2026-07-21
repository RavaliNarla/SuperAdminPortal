import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import FormFieldsBuilder from './FormFieldsBuilder';
import usePortalScreens from './hooks/usePortalScreens';

// Fallback labels for known portal keys returned by GET /portalScreens —
// the API only gives back the raw key (e.g. "recruitment"), not a display label.
const PORTAL_LABELS = {
  recruitment: 'Recruitment Portal',
  candidate: 'Candidate Portal',
};

function portalLabel(portalKey) {
  return PORTAL_LABELS[portalKey] || `${portalKey.charAt(0).toUpperCase()}${portalKey.slice(1)} Portal`;
}

function formValue(form) {
  return `${form.portal}.${form.key}`;
}

export default function DynamicFormsHome() {
  const { organizationId } = useParams();
  const organization = useAppSelector((state) =>
    state.organizations.items.find((org) => org.id === organizationId)
  );
  console.log("orga", organization);
  const [selectedFormKey, setSelectedFormKey] = useState('');
  const { screens, loading: screensLoading, error: screensError } = usePortalScreens();

  const configurableForms = screens.map((screen) => ({
    id: screen.id,
    key: screen.screenKey,
    portal: screen.portal,
    title: screen.screenName,
  }));

  const portals = configurableForms.reduce((acc, form) => {
    if (!acc.some((portal) => portal.key === form.portal)) {
      acc.push({ key: form.portal, label: portalLabel(form.portal) });
    }
    return acc;
  }, []);

  if (!organization) {
    return (
      <div className="card-bg card-body">
        <h2 className="h5 page-title">Organization not found</h2>
        <Link to="/organizations" className="btn btn-outline-primary">
          Back to Organizations
        </Link>
      </div>
    );
  }

  const selectedForm = configurableForms.find((form) => formValue(form) === selectedFormKey);
  const organizationKey = organization.code || organization.id;
  console.log('selectedForm', organization);
  console.log('DynamicFormsHome: organizationKey', organizationKey, 'selectedFormKey', selectedFormKey);

  return (
    <div className="card-bg card-body">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h5 page-title">Dynamic Forms — {organization.name || organization.id}</h2>
          <p className="text-muted mb-0">Configure extra fields for this organization's forms.</p>
          {!organization.code && (
            <p className="text-warning small mb-0">
              No code set for this organization — fields will be saved under its internal id
              instead, which won't match the Recruitment Portal's login URL key. Set an
              Organization Code on the Edit Organization page first.
            </p>
          )}
        </div>
        <Link to={`/organizations/${organizationId}`} className="btn btn-outline-secondary">
          Back
        </Link>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <label className="form-label">Select a form</label>
          <select
            className="form-select"
            value={selectedFormKey}
            onChange={(e) => setSelectedFormKey(e.target.value)}
          >
            <option value="">Choose a form...</option>
            {screensLoading && <option disabled>Loading forms…</option>}
            {portals.map((portal) => {
              const forms = configurableForms.filter((form) => form.portal === portal.key);
              if (forms.length === 0) return null;
              return (
                <optgroup key={portal.key} label={portal.label}>
                  {forms.map((form) => (
                    <option key={formValue(form)} value={formValue(form)}>
                      {form.title}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
          {screensError && (
            <p className="text-danger small mt-2 mb-0">Failed to load forms. Please try again.</p>
          )}
          {selectedForm?.description && <p className="text-muted mt-2 mb-0">{selectedForm.description}</p>}
        </div>
      </div>

      {selectedForm && (
        <div className="card-bg card-body mt-4">
          <h3 className="h6 mb-3">{selectedForm.title} — Fields</h3>
          <FormFieldsBuilder
            key={formValue(selectedForm)}
            organizationKey={organizationKey}
            portal={selectedForm.portal}
            formKey={selectedForm.key}
            screenId={selectedForm.id}
          />
        </div>
      )}
    </div>
  );
}
