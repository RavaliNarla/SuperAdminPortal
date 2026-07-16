// mapper/organization.mapper.js

export const mapOrganizationList = (organizations = []) => {
  return organizations.map((organization) => ({
    id: organization.id,
    name: organization.name || "",
    domain: organization.domain || "",
    timeZone: organization.timeZone || "",
    status: organization.status || "Inactive",
  }));
};

export const mapOrganization = (item) => ({
  id: item.id,

  name: item.name,

  code: item.code,

  domain: item.domain,

  description: item.description,

  status: item.status,

  registrationNumber: item.registrationNumber,

  logoUrl: item.logoUrl,

  loginBackgroundUrl: item.loginBackgroundUrl,

  contact: {
    email: item.email,
    phone: item.phone,
    address: item.address,
  },

  theme: {
    primaryColor: item.primaryColor,
    secondaryColor: item.secondaryColor,
  },

  regional: {
    timezone: item.timezone,
    language: item.language,
    currency: item.currency,
    dateFormat: item.dateFormat,
  },

  admin: item.admin,

  modules: item.modules,

  subscription: item.subscription,
});

export const mapOrganizations = (response) =>
  response?.map(mapOrganization) || [];


// mapper/organization.mapper.js
export const mapEditOrganization = (response) => {
  const item = response.data;
  const org = item.organizationDetailsJson || {};

  return {
    id: item.id,
    name: org.name,
    code: org.code,
    type: org.type,
    domain: org.domain,
    description: org.description,

    registrationNumber: org.registrationNumber,
    logoUrl: org.logoUrl,
    loginBackgroundUrl: org.loginBackgroundUrl,

    email: org.email,
    phone: org.phone,
    address: org.address,
    city: org.city,
    state: org.state,
    country: org.country,
    website: org.website,
    contactPerson: org.contactPerson,

    primaryColor: org.primaryColor,
    secondaryColor: org.secondaryColor,

    theme: org.theme || {},
    contact: org.contact || {},
    admin: org.admin || {},
    regional: org.regional || {},
    modules: org.modules || {},
    subscription: org.subscription || {},

    status: item.isActive ? "active" : "inactive",
  };
};

export const mapEditOrganizations = (response = []) =>
  response.map(mapEditOrganization);