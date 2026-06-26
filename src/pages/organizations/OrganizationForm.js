import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addOrganization, updateOrganization } from '../../features/organizations/orgSlice';

const defaultFormData = {
  name: '',
  code: '',
  type: '',
  domain: '',
  registrationNumber: '',
  logoUrl: 'https://via.placeholder.com/120x120.png?text=ORG',
  primaryColor: '#0d6efd',
  secondaryColor: '#6610f2',
  loginBackgroundUrl: 'https://via.placeholder.com/1200x300.png?text=Login+Background',
  contactPerson: '',
  email: '',
  phone: '',
  website: '',
  address: '',
  city: '',
  state: '',
  country: '',
  admin: {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    temporaryPassword: '',
  },
  subscription: {
    plan: '',
    startDate: '',
    endDate: '',
    status: 'active',
  },
  regional: {
    timezone: 'Asia/Kolkata',
    language: 'English',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
  },
  modules: {
    candidatePortal: true,
    recruitmentPortal: true,
  },
  description: '',
};

export default function OrganizationForm() {
  const { organizationId } = useParams();
  const organizations = useAppSelector((state) => state.organizations.items);
  const existingOrganization = organizations.find((org) => org.id === organizationId);
  const [formData, setFormData] = useState(defaultFormData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (existingOrganization) {
      setFormData({
        name: existingOrganization.name || '',
        code: existingOrganization.code || '',
        type: existingOrganization.type || '',
        domain: existingOrganization.domain || '',
        registrationNumber: existingOrganization.registrationNumber || '',
        logoUrl: existingOrganization.logoUrl || defaultFormData.logoUrl,
        primaryColor:
          existingOrganization.primaryColor || existingOrganization.theme?.primaryColor || defaultFormData.primaryColor,
        secondaryColor:
          existingOrganization.secondaryColor || existingOrganization.theme?.secondaryColor || defaultFormData.secondaryColor,
        loginBackgroundUrl: existingOrganization.loginBackgroundUrl || defaultFormData.loginBackgroundUrl,
        contactPerson: existingOrganization.contactPerson || '',
        email: existingOrganization.email || existingOrganization.contact?.email || '',
        phone: existingOrganization.phone || existingOrganization.contact?.phone || '',
        website: existingOrganization.website || '',
        address: existingOrganization.address || existingOrganization.contact?.address || '',
        city: existingOrganization.city || '',
        state: existingOrganization.state || '',
        country: existingOrganization.country || '',
        admin: {
          firstName: existingOrganization.admin?.firstName || '',
          lastName: existingOrganization.admin?.lastName || '',
          email: existingOrganization.admin?.email || '',
          username: existingOrganization.admin?.username || '',
          temporaryPassword: existingOrganization.admin?.temporaryPassword || '',
        },
        subscription: {
          plan: existingOrganization.subscription?.plan || '',
          startDate: existingOrganization.subscription?.startDate || '',
          endDate: existingOrganization.subscription?.endDate || '',
          status: existingOrganization.subscription?.status || 'active',
        },
        regional: {
          timezone: existingOrganization.regional?.timezone || existingOrganization.timezone || defaultFormData.regional.timezone,
          language: existingOrganization.regional?.language || existingOrganization.language || defaultFormData.regional.language,
          currency: existingOrganization.regional?.currency || existingOrganization.currency || defaultFormData.regional.currency,
          dateFormat: existingOrganization.regional?.dateFormat || existingOrganization.dateFormat || defaultFormData.regional.dateFormat,
        },
        modules: {
          candidatePortal: existingOrganization.modules?.candidatePortal ?? true,
          recruitmentPortal: existingOrganization.modules?.recruitmentPortal ?? true,
        },
        description: existingOrganization.description || '',
      });
    }
  }, [existingOrganization]);

  const isEditMode = useMemo(() => Boolean(organizationId), [organizationId]);

  const handleChange = (field, value) => {
    if (field === 'regional.timezone') {
      setFormData((prev) => ({
        ...prev,
        timezone: value,
        regional: {
          ...prev.regional,
          timezone: value,
        },
      }));
      return;
    }

    if (field === 'subscription.status') {
      setFormData((prev) => ({
        ...prev,
        status: value,
        subscription: {
          ...prev.subscription,
          status: value,
        },
      }));
      return;
    }

    if (field.includes('.')) {
      const [group, key] = field.split('.');
      setFormData((prev) => ({
        ...prev,
        [group]: {
          ...prev[group],
          [key]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (field, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const buildOrganizationPayload = (data) => ({
    ...data,
    contact: {
      email: data.email,
      phone: data.phone,
      address: data.address,
    },
    theme: {
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
    },
  });

  const handleSaveDraft = () => {
    const payload = buildOrganizationPayload({ ...formData, draft: true });
    if (isEditMode && organizationId) {
      dispatch(updateOrganization({ id: organizationId, changes: payload }));
    } else {
      dispatch(addOrganization(payload));
    }
    navigate('/organizations');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = buildOrganizationPayload(formData);

    if (isEditMode && organizationId) {
      dispatch(updateOrganization({ id: organizationId, changes: payload }));
    } else {
      dispatch(addOrganization(payload));
    }

    navigate('/organizations');
  };

  return (
    <div className="card-bg card-body">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h5 page-title">{isEditMode ? 'Edit Organization' : 'Create Organization'}</h2>
          <p className="text-muted mb-0">Configure tenant settings, branding, contact details, and modules.</p>
        </div>
        <Link to="/organizations" className="btn btn-outline-secondary">
          Back
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-bg card-body mb-4">
          <h3 className="h6 mb-3">Organization Information</h3>
          <div className="row gy-3">
            <div className="col-lg-6">
              <label className="form-label">Organization Name</label>
              <input className="form-control" value={formData.name} onChange={(event) => handleChange('name', event.target.value)} required />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Organization Code</label>
              <input className="form-control" value={formData.code} onChange={(event) => handleChange('code', event.target.value)} />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Organization Type</label>
              <input className="form-control" value={formData.type} onChange={(event) => handleChange('type', event.target.value)} />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Organization Domain</label>
              <input className="form-control" value={formData.domain} onChange={(event) => handleChange('domain', event.target.value)} />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Registration Number</label>
              <input className="form-control" value={formData.registrationNumber} onChange={(event) => handleChange('registrationNumber', event.target.value)} />
            </div>
          </div>
        </div>

        <div className="card-bg card-body mb-4">
          <h3 className="h6 mb-3">Branding</h3>
          <div className="row gy-3">
            <div className="col-lg-6">
              <label className="form-label">Logo Upload</label>
              <input type="file" accept="image/*" className="form-control" onChange={(event) => handleFileChange('logoUrl', event.target.files?.[0])} />
              {formData.logoUrl && (
                <img src={formData.logoUrl} alt="Logo preview" className="img-fluid mt-2" style={{ maxHeight: '80px' }} />
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label">Primary Color</label>
              <input type="color" className="form-control form-control-color" value={formData.primaryColor} onChange={(event) => handleChange('primaryColor', event.target.value)} />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Secondary Color</label>
              <input type="color" className="form-control form-control-color" value={formData.secondaryColor} onChange={(event) => handleChange('secondaryColor', event.target.value)} />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Login Background</label>
              <input type="file" accept="image/*" className="form-control" onChange={(event) => handleFileChange('loginBackgroundUrl', event.target.files?.[0])} />
              {formData.loginBackgroundUrl && (
                <img src={formData.loginBackgroundUrl} alt="Login background preview" className="img-fluid mt-2" style={{ maxHeight: '120px', width: '100%', objectFit: 'cover' }} />
              )}
            </div>
          </div>
        </div>

        <div className="card-bg card-body mb-4">
          <h3 className="h6 mb-3">Contact Information</h3>
          <div className="row gy-3">
            <div className="col-lg-4">
              <label className="form-label">Contact Person</label>
              <input className="form-control" value={formData.contactPerson} onChange={(event) => handleChange('contactPerson', event.target.value)} />
            </div>
            <div className="col-lg-4">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={formData.email} onChange={(event) => handleChange('email', event.target.value)} />
            </div>
            <div className="col-lg-4">
              <label className="form-label">Phone</label>
              <input className="form-control" value={formData.phone} onChange={(event) => handleChange('phone', event.target.value)} />
            </div>
            <div className="col-lg-4">
              <label className="form-label">Website</label>
              <input className="form-control" value={formData.website} onChange={(event) => handleChange('website', event.target.value)} />
            </div>
            <div className="col-lg-8">
              <label className="form-label">Address</label>
              <input className="form-control" value={formData.address} onChange={(event) => handleChange('address', event.target.value)} />
            </div>
            <div className="col-lg-4">
              <label className="form-label">City</label>
              <input className="form-control" value={formData.city} onChange={(event) => handleChange('city', event.target.value)} />
            </div>
            <div className="col-lg-4">
              <label className="form-label">State</label>
              <input className="form-control" value={formData.state} onChange={(event) => handleChange('state', event.target.value)} />
            </div>
            <div className="col-lg-4">
              <label className="form-label">Country</label>
              <input className="form-control" value={formData.country} onChange={(event) => handleChange('country', event.target.value)} />
            </div>
          </div>
        </div>

        <div className="card-bg card-body mb-4">
          <h3 className="h6 mb-3">Organization Admin</h3>
          <div className="row gy-3">
            <div className="col-lg-4">
              <label className="form-label">First Name</label>
              <input className="form-control" value={formData.admin.firstName} onChange={(event) => handleChange('admin.firstName', event.target.value)} />
            </div>
            <div className="col-lg-4">
              <label className="form-label">Last Name</label>
              <input className="form-control" value={formData.admin.lastName} onChange={(event) => handleChange('admin.lastName', event.target.value)} />
            </div>
            <div className="col-lg-4">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={formData.admin.email} onChange={(event) => handleChange('admin.email', event.target.value)} />
            </div>
            <div className="col-lg-4">
              <label className="form-label">Username</label>
              <input className="form-control" value={formData.admin.username} onChange={(event) => handleChange('admin.username', event.target.value)} />
            </div>
            <div className="col-lg-4">
              <label className="form-label">Temporary Password</label>
              <input className="form-control" value={formData.admin.temporaryPassword} onChange={(event) => handleChange('admin.temporaryPassword', event.target.value)} />
            </div>
          </div>
        </div>

        <div className="card-bg card-body mb-4">
          <h3 className="h6 mb-3">Subscription</h3>
          <div className="row gy-3">
            <div className="col-lg-3">
              <label className="form-label">Plan</label>
              <input className="form-control" value={formData.subscription.plan} onChange={(event) => handleChange('subscription.plan', event.target.value)} />
            </div>
            <div className="col-lg-3">
              <label className="form-label">Start Date</label>
              <input type="date" className="form-control" value={formData.subscription.startDate} onChange={(event) => handleChange('subscription.startDate', event.target.value)} />
            </div>
            <div className="col-lg-3">
              <label className="form-label">End Date</label>
              <input type="date" className="form-control" value={formData.subscription.endDate} onChange={(event) => handleChange('subscription.endDate', event.target.value)} />
            </div>
            <div className="col-lg-3">
              <label className="form-label">Status</label>
              <select className="form-select" value={formData.subscription.status} onChange={(event) => handleChange('subscription.status', event.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-bg card-body mb-4">
          <h3 className="h6 mb-3">Regional Settings</h3>
          <div className="row gy-3">
            <div className="col-lg-3">
              <label className="form-label">Timezone</label>
              <select className="form-select" value={formData.regional.timezone} onChange={(event) => handleChange('regional.timezone', event.target.value)}>
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="Europe/London">Europe/London</option>
                <option value="America/New_York">America/New_York</option>
              </select>
            </div>
            <div className="col-lg-3">
              <label className="form-label">Language</label>
              <select className="form-select" value={formData.regional.language} onChange={(event) => handleChange('regional.language', event.target.value)}>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
            <div className="col-lg-3">
              <label className="form-label">Currency</label>
              <input className="form-control" value={formData.regional.currency} onChange={(event) => handleChange('regional.currency', event.target.value)} />
            </div>
            <div className="col-lg-3">
              <label className="form-label">Date Format</label>
              <input className="form-control" value={formData.regional.dateFormat} onChange={(event) => handleChange('regional.dateFormat', event.target.value)} />
            </div>
          </div>
        </div>

        <div className="card-bg card-body mb-4">
          <h3 className="h6 mb-3">Modules</h3>
          <div className="row gy-3">
            <div className="col-lg-6 form-check form-switch">
              <input className="form-check-input" type="checkbox" checked={formData.modules.candidatePortal} onChange={(event) => handleChange('modules.candidatePortal', event.target.checked)} id="candidatePortalSwitch" />
              <label className="form-check-label" htmlFor="candidatePortalSwitch">Candidate Portal</label>
            </div>
            <div className="col-lg-6 form-check form-switch">
              <input className="form-check-input" type="checkbox" checked={formData.modules.recruitmentPortal} onChange={(event) => handleChange('modules.recruitmentPortal', event.target.checked)} id="recruitmentPortalSwitch" />
              <label className="form-check-label" htmlFor="recruitmentPortalSwitch">Recruitment Portal</label>
            </div>
          </div>
        </div>

        <div className="card-bg card-body mb-4">
          <h3 className="h6 mb-3">Description</h3>
          <div className="mb-3">
            <textarea className="form-control" rows={4} value={formData.description} onChange={(event) => handleChange('description', event.target.value)} />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <Link to="/organizations" className="btn btn-outline-secondary">
            Cancel
          </Link>
          <button type="button" className="btn btn-outline-primary" onClick={handleSaveDraft}>
            Save Draft
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditMode ? 'Save Changes' : 'Create Organization'}
          </button>
        </div>
      </form>
    </div>
  );
}
