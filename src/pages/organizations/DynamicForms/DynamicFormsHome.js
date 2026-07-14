import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import FormFieldsBuilder from './FormFieldsBuilder';

const CONFIGURABLE_FORMS = [
  {
    key: 'requisition',
    title: 'Requisition Form',
    description: 'Extra fields shown when creating a job requisition in the Recruitment Portal.',
  },
  {
    key: 'jobPosting',
    title: 'Job Posting Form',
    description: 'Extra fields shown when adding a position under a requisition in the Recruitment Portal.',
  },
];

export default function DynamicFormsHome() {
  const { organizationId } = useParams();
  const organization = useAppSelector((state) =>
    state.organizations.items.find((org) => org.id === organizationId)
  );
  const [selectedFormKey, setSelectedFormKey] = useState('');

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

  const selectedForm = CONFIGURABLE_FORMS.find((form) => form.key === selectedFormKey);
  const organizationKey = organization.slug || organization.id;

  return (
    <div className="card-bg card-body">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h5 page-title">Dynamic Forms — {organization.name}</h2>
          <p className="text-muted mb-0">Configure extra fields for this organization's forms.</p>
          {!organization.slug && (
            <p className="text-warning small mb-0">
              No slug set for this organization — fields will be saved under its internal id
              instead, which won't match the Recruitment Portal's login URL key. Set a slug on the
              Edit Organization page first.
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
            {CONFIGURABLE_FORMS.map((form) => (
              <option key={form.key} value={form.key}>
                {form.title}
              </option>
            ))}
          </select>
          {selectedForm && <p className="text-muted mt-2 mb-0">{selectedForm.description}</p>}
        </div>
      </div>

      {selectedForm && (
        <div className="card-bg card-body mt-4">
          <h3 className="h6 mb-3">{selectedForm.title} — Fields</h3>
          <FormFieldsBuilder
            key={selectedForm.key}
            organizationKey={organizationKey}
            formKey={selectedForm.key}
            title={selectedForm.title}
          />
        </div>
      )}
    </div>
  );
}
