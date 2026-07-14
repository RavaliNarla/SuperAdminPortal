import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addOrganization, updateOrganization } from '../../features/organizations/orgSlice';
import "../../css/OrganizationForm.css";

const defaultFormData = {
  name: '',
  code: '',
  slug: '',
  type: '',
  domain: '',
  registrationNumber: '',
  logoUrl: '',
  primaryColor: '#0d6efd',
  secondaryColor: '#6610f2',
  loginBackgroundUrl: '',
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
        slug: existingOrganization.slug || '',
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
      <div className="align-items-center mb-4">
        <div className="page-header mb-4">

          <div className="page-header-left">
            <h2 className="page-title">
              Organization Info
            </h2>

            <p className="page-subtitle">
              Add your organization information
            </p>
          </div>

          <div className="page-header-right">

            <Link
              to="/organizations"
              className="btn btn-cancel"
            >
              <i className="bi bi-x-lg me-2"></i>
              Cancel
            </Link>

            <button
              type="submit"
              className="btn btn-save"
            >
              <i className="bi bi-floppy me-2"></i>

              {isEditMode
                ? "Save Changes"
                : "Create Organization"}
            </button>

          </div>

        </div>
        {/* <div>
          <h2 className="h4 page-title">{isEditMode ? 'Edit Organization' : 'Create Organization'}</h2>
          <p className="text-muted mb-0">Configure tenant settings, branding, contact details, and modules.</p>
        </div>
        <Link to="/organizations" className="btn btn-outline-secondary">
          Back
        </Link> */}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="organization-card mb-4">
          <div className="card-body">

            <div className="section-header mb-4">
              <div>
                <h5 className="section-title">Organization Information</h5>
                <p className="section-subtitle">
                  Enter the basic details of your organization.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <label className="form-label">Organization Code</label>
              <input className="form-control" value={formData.code} onChange={(event) => handleChange('code', event.target.value)} />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Slug</label>
              <input
                className="form-control"
                value={formData.slug}
                onChange={(event) => handleChange('slug', event.target.value)}
                placeholder="e.g. bob"
              />
              <div className="form-text">Must match this organization's login URL key in the Recruitment Portal (e.g. "bob" for /bob/login).</div>
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

        <div className="organization-card mb-4">
          <div className="card-body">

            <div className="section-header mb-4">
              <div>
                <h5 className="section-title">Branding</h5>
                <p className="section-subtitle">
                  Configure your organization branding and theme.
                </p>
              </div>
            </div>

            <div className="row g-4">

              {/* Organization Logo */}
              <div className="col-lg-6">

                <label className="upload-label">
                  <i className="bi bi-card-image me-2"></i>
                  Organization Logo
                </label>

                <div className="logo-upload-wrapper">

                  <div className="logo-preview-box">

                    {formData.logoUrl ? (
                      <img
                        src={formData.logoUrl}
                        alt="Logo"
                        className="logo-preview"
                      />
                    ) : (
                      <div className="logo-placeholder">
                        <i className="bi bi-buildings"></i>
                      </div>
                    )}

                  </div>

                  <div className="upload-content">

                    <label className="upload-btn">

                      <i className="bi bi-upload me-2"></i>

                      Upload Logo

                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(event) =>
                          handleFileChange(
                            "logoUrl",
                            event.target.files?.[0]
                          )
                        }
                      />

                    </label>

                    <p className="upload-note">
                      PNG, JPG up to 5MB
                    </p>

                  </div>

                </div>

              </div>

              {/* Login Background */}
              <div className="col-lg-6">

                <label className="upload-label">
                  <i className="bi bi-image me-2"></i>
                  Login Background
                </label>

                <div className="logo-upload-wrapper">

                  <div className="logo-preview-box">

                    {formData.loginBackgroundUrl ? (
                      <img
                        src={formData.loginBackgroundUrl}
                        alt="Background"
                        className="logo-preview"
                      />
                    ) : (
                      <div className="logo-placeholder">
                        <i className="bi bi-image"></i>
                      </div>
                    )}

                  </div>

                  <div className="upload-content">

                    <label className="upload-btn">

                      <i className="bi bi-upload me-2"></i>

                      Upload Background

                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(event) =>
                          handleFileChange(
                            "loginBackgroundUrl",
                            event.target.files?.[0]
                          )
                        }
                      />

                    </label>

                    <p className="upload-note">
                      PNG, JPG up to 5MB
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Colors */}
            <div className="row g-4 mt-3">

              <div className="col-lg-6">
                <label className="form-label">Primary Color</label>

                <div className="color-picker-group">
                  <input
                    type="color"
                    className="form-control form-control-color"
                    value={formData.primaryColor}
                    onChange={(e) =>
                      handleChange("primaryColor", e.target.value)
                    }
                  />

                  <input
                    className="form-control"
                    value={formData.primaryColor}
                    onChange={(e) =>
                      handleChange("primaryColor", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <label className="form-label">Secondary Color</label>

                <div className="color-picker-group">
                  <input
                    type="color"
                    className="form-control form-control-color"
                    value={formData.secondaryColor}
                    onChange={(e) =>
                      handleChange("secondaryColor", e.target.value)
                    }
                  />

                  <input
                    className="form-control"
                    value={formData.secondaryColor}
                    onChange={(e) =>
                      handleChange("secondaryColor", e.target.value)
                    }
                  />
                </div>
              </div>

            </div>

          </div>
        </div>

        <div className="organization-card mb-4">

          <div className="card-body">

            <div className="section-header mb-4">
              <div>
                <h5 className="section-title">Contact Information</h5>
                <p className="section-subtitle">
                  Enter organization contact and address details.
                </p>
              </div>
            </div>

            <div className="row g-4">

              {/* Contact Person */}
              <div className="col-lg-6">
                <label className="form-label">
                  Contact Person
                </label>

                <input
                  className="form-control modern-input"
                  placeholder="Enter contact person"
                  value={formData.contactPerson}
                  onChange={(event) =>
                    handleChange("contactPerson", event.target.value)
                  }
                />
              </div>

              {/* Email */}
              <div className="col-lg-6">
                <label className="form-label">
                  Email Address
                </label>

                <input
                  type="email"
                  className="form-control modern-input"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                />
              </div>

              {/* Phone */}
              <div className="col-lg-6">
                <label className="form-label">
                  Phone Number
                </label>

                <input
                  className="form-control modern-input"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                />
              </div>

              {/* Website */}
              <div className="col-lg-6">
                <label className="form-label">
                  Website
                </label>

                <input
                  className="form-control modern-input"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(event) =>
                    handleChange("website", event.target.value)
                  }
                />
              </div>

              <div className="col-lg-12">

                <label className="form-label">
                  Head Office Address
                </label>

                <div className="address-card">

                  <textarea
                    rows="4"
                    className="form-control address-textarea"
                    placeholder="Enter complete head office address"
                    value={formData.address}
                    onChange={(event) =>
                      handleChange("address", event.target.value)
                    }
                  />

                </div>

              </div>

              {/* City */}
              <div className="col-lg-4">
                <label className="form-label">
                  City
                </label>

                <input
                  className="form-control modern-input"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(event) =>
                    handleChange("city", event.target.value)
                  }
                />
              </div>

              {/* State */}
              <div className="col-lg-4">
                <label className="form-label">
                  State
                </label>

                <input
                  className="form-control modern-input"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={(event) =>
                    handleChange("state", event.target.value)
                  }
                />
              </div>

              {/* Country */}
              <div className="col-lg-4">
                <label className="form-label">
                  Country
                </label>

                <input
                  className="form-control modern-input"
                  placeholder="Enter country"
                  value={formData.country}
                  onChange={(event) =>
                    handleChange("country", event.target.value)
                  }
                />
              </div>

            </div>

          </div>

        </div>


        <div className="organization-card mb-4">

          <div className="card-body">

            <div className="section-header mb-4">
              <div>
                <h5 className="section-title">Organization Administrator</h5>
                <p className="section-subtitle">
                  Create the primary administrator account for this organization.
                </p>
              </div>
            </div>

            <div className="row g-4">

              {/* First Name */}
              <div className="col-lg-6">
                <label className="form-label">
                  First Name <span className="required">*</span>
                </label>

                <input
                  type="text"
                  className="form-control modern-input"
                  placeholder="Enter first name"
                  value={formData.admin.firstName}
                  onChange={(event) =>
                    handleChange("admin.firstName", event.target.value)
                  }
                />
              </div>

              {/* Last Name */}
              <div className="col-lg-6">
                <label className="form-label">
                  Last Name <span className="required">*</span>
                </label>

                <input
                  type="text"
                  className="form-control modern-input"
                  placeholder="Enter last name"
                  value={formData.admin.lastName}
                  onChange={(event) =>
                    handleChange("admin.lastName", event.target.value)
                  }
                />
              </div>

              {/* Email */}
              <div className="col-lg-6">
                <label className="form-label">
                  Email Address <span className="required">*</span>
                </label>

                <input
                  type="email"
                  className="form-control modern-input"
                  placeholder="admin@company.com"
                  value={formData.admin.email}
                  onChange={(event) =>
                    handleChange("admin.email", event.target.value)
                  }
                />
              </div>

              {/* Username */}
              <div className="col-lg-6">
                <label className="form-label">
                  Username
                </label>

                <input
                  type="text"
                  className="form-control modern-input"
                  placeholder="Enter username"
                  value={formData.admin.username}
                  onChange={(event) =>
                    handleChange("admin.username", event.target.value)
                  }
                />
              </div>

              {/* Temporary Password */}
              <div className="col-lg-6">
                <label className="form-label">
                  Temporary Password
                </label>

                <div className="input-group">

                  <input
                    type="password"
                    className="form-control modern-input"
                    placeholder="Enter temporary password"
                    value={formData.admin.temporaryPassword}
                    onChange={(event) =>
                      handleChange(
                        "admin.temporaryPassword",
                        event.target.value
                      )
                    }
                  />

                  <span className="input-group-text bg-white">
                    <i className="bi bi-key"></i>
                  </span>

                </div>
              </div>

            </div>

          </div>

        </div>

        {/* <div className="organization-card mb-4">

          <div className="card-body">

            <div className="section-header mb-4">
              <div>
                <h5 className="section-title">Subscription</h5>
                <p className="section-subtitle">
                  Configure the organization's subscription details.
                </p>
              </div>
            </div>

            <div className="row g-4">

              
              <div className="col-lg-3 col-md-6">
                <label className="form-label">
                  Subscription Plan
                </label>

                <select
                  className="form-select modern-input"
                  value={formData.subscription.plan}
                  onChange={(event) =>
                    handleChange("subscription.plan", event.target.value)
                  }
                >
                  <option value="">Select Plan</option>
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Professional">Professional</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

             
              <div className="col-lg-3 col-md-6">
                <label className="form-label">
                  Start Date
                </label>

                <input
                  type="date"
                  className="form-control modern-input"
                  value={formData.subscription.startDate}
                  onChange={(event) =>
                    handleChange("subscription.startDate", event.target.value)
                  }
                />
              </div>

             
              <div className="col-lg-3 col-md-6">
                <label className="form-label">
                  End Date
                </label>

                <input
                  type="date"
                  className="form-control modern-input"
                  value={formData.subscription.endDate}
                  onChange={(event) =>
                    handleChange("subscription.endDate", event.target.value)
                  }
                />
              </div>

              <div className="col-lg-3 col-md-6">
                <label className="form-label">
                  Subscription Status
                </label>

                <div className="status-wrapper">

                  <select
                    className="form-select modern-input"
                    value={formData.subscription.status}
                    onChange={(event) =>
                      handleChange("subscription.status", event.target.value)
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>

                  <span
                    className={`status-badge ${formData.subscription.status === "active"
                      ? "active"
                      : formData.subscription.status === "inactive"
                        ? "inactive"
                        : "pending"
                      }`}
                  >
                    {formData.subscription.status || "Status"}
                  </span>

                </div>
              </div>

            </div>

          </div>

        </div> */}

        <div className="organization-card mb-4">

          <div className="card-body">

            <div className="section-header mb-4">
              <div>
                <h5 className="section-title">Regional Settings</h5>
                <p className="section-subtitle">
                  Configure timezone, language, currency and date format.
                </p>
              </div>
            </div>

            <div className="row g-4">

              {/* Timezone */}
              <div className="col-lg-6 col-md-6">
                <label className="form-label">
                  Timezone
                </label>

                <select
                  className="form-select modern-input"
                  value={formData.regional.timezone}
                  onChange={(event) =>
                    handleChange("regional.timezone", event.target.value)
                  }
                >
                  <option value="">Select Timezone</option>
                  <option value="Asia/Kolkata">(GMT +05:30) Asia/Kolkata</option>
                  <option value="Europe/London">(GMT +00:00) Europe/London</option>
                  <option value="America/New_York">(GMT -05:00) America/New_York</option>
                </select>
              </div>

              {/* Language */}
              <div className="col-lg-6 col-md-6">
                <label className="form-label">
                  Default Language
                </label>

                <select
                  className="form-select modern-input"
                  value={formData.regional.language}
                  onChange={(event) =>
                    handleChange("regional.language", event.target.value)
                  }
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>

              {/* Currency */}
              <div className="col-lg-6 col-md-6">
                <label className="form-label">
                  Currency
                </label>

                <select
                  className="form-select modern-input"
                  value={formData.regional.currency}
                  onChange={(event) =>
                    handleChange("regional.currency", event.target.value)
                  }
                >
                  <option value="">Select Currency</option>
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>

              {/* Date Format */}
              <div className="col-lg-6 col-md-6">
                <label className="form-label">
                  Date Format
                </label>

                <select
                  className="form-select modern-input"
                  value={formData.regional.dateFormat}
                  onChange={(event) =>
                    handleChange("regional.dateFormat", event.target.value)
                  }
                >
                  <option value="">Select Date Format</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

            </div>

          </div>

        </div>

        <div className="organization-card mb-4">

          <div className="card-body">

            <div className="section-header mb-4">
              <div>
                <h5 className="section-title">Modules</h5>
                <p className="section-subtitle">
                  Enable or disable the modules available for this organization.
                </p>
              </div>
            </div>

            <div className="row g-4">

              {/* Candidate Portal */}
              <div className="col-lg-6">

                <div className="module-card">

                  <div className="module-left">

                    <div className="module-icon">
                      <i className="bi bi-person-badge"></i>
                    </div>

                    <div>

                      <h6 className="module-title">
                        Candidate Portal
                      </h6>

                      <p className="module-desc">
                        Allow candidates to register, apply and track applications.
                      </p>

                    </div>

                  </div>

                  <div className="form-check form-switch">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="candidatePortalSwitch"
                      checked={formData.modules.candidatePortal}
                      onChange={(event) =>
                        handleChange(
                          "modules.candidatePortal",
                          event.target.checked
                        )
                      }
                    />

                  </div>

                </div>

              </div>

              {/* Recruitment Portal */}
              <div className="col-lg-6">

                <div className="module-card">

                  <div className="module-left">

                    <div className="module-icon">
                      <i className="bi bi-briefcase"></i>
                    </div>

                    <div>

                      <h6 className="module-title">
                        Recruitment Portal
                      </h6>

                      <p className="module-desc">
                        Enable recruiter, HR and interview management features.
                      </p>

                    </div>

                  </div>

                  <div className="form-check form-switch">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="recruitmentPortalSwitch"
                      checked={formData.modules.recruitmentPortal}
                      onChange={(event) =>
                        handleChange(
                          "modules.recruitmentPortal",
                          event.target.checked
                        )
                      }
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="organization-card mb-4">

          <div className="card-body">

            <div className="section-header mb-4">
              <div>
                <h5 className="section-title">Organization Description</h5>
                <p className="section-subtitle">
                  Provide a brief overview of the organization. This information helps administrators identify the organization.
                </p>
              </div>
            </div>

            <div className="row">

              <div className="col-12">

                <label className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control modern-textarea"
                  rows={5}
                  placeholder="Enter organization description..."
                  value={formData.description}
                  onChange={(event) =>
                    handleChange("description", event.target.value)
                  }
                />

                <div className="description-footer">
                  <small className="text-muted">
                    {formData.description?.length || 0}/500 Characters
                  </small>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* <div className="form-footer">

          <Link
            to="/organizations"
            className="btn btn-cancel"
          >
            <i className="bi bi-x-circle me-2"></i>
            Cancel
          </Link>

          <button
            type="button"
            className="btn btn-draft"
            onClick={handleSaveDraft}
          >
            <i className="bi bi-file-earmark me-2"></i>
            Save Draft
          </button>

          <button
            type="submit"
            className="btn btn-save"
          >
            <i className="bi bi-check-circle me-2"></i>

            {isEditMode
              ? "Save Changes"
              : "Create Organization"}
          </button>

        </div> */}
      </form>
    </div>
  );
}
