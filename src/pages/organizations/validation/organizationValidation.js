// src/pages/organizations/validation/organizationValidation.js

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const mobileRegex = /^[6-9]\d{9}$/;

const isEmpty = (value) =>
  value === undefined || value === null || value.toString().trim() === "";

export const validateOrganizationForm = (data) => {
  const errors = {};

  // ==========================
  // Organization Information
  // ==========================

  if (isEmpty(data.name))
    errors.name = "Organization Name is required.";

  if (isEmpty(data.code))
    errors.code = "Organization Code is required.";

  if (isEmpty(data.type))
    errors.type = "Organization Type is required.";

  if (isEmpty(data.domain))
    errors.domain = "Business Domain is required.";

  // if (isEmpty(data.registrationNumber))
  //   errors.registrationNumber = "Registration Number is required.";

  // ==========================
  // Contact Information
  // ==========================

  // if (isEmpty(data.contactPerson))
  //   errors.contactPerson = "Contact Person is required.";

  // if (isEmpty(data.email)) {
  //   errors.email = "Email is required.";
  // } else if (!emailRegex.test(data.email)) {
  //   errors.email = "Please enter a valid email address.";
  // }

  // if (isEmpty(data.phone)) {
  //   errors.phone = "Phone Number is required.";
  // } else if (!mobileRegex.test(data.phone)) {
  //   errors.phone = "Please enter a valid 10-digit mobile number.";
  // }

  // if (isEmpty(data.website))
  //   errors.website = "Website is required.";

  // if (isEmpty(data.address))
  //   errors.address = "Address is required.";

  // if (isEmpty(data.city))
  //   errors.city = "City is required.";

  // if (isEmpty(data.state))
  //   errors.state = "State is required.";

  // if (isEmpty(data.country))
  //   errors.country = "Country is required.";

  // // ==========================
  // // Organization Admin
  // // ==========================

  // if (isEmpty(data.admin?.firstName))
  //   errors.adminFirstName = "First Name is required.";

  // if (isEmpty(data.admin?.lastName))
  //   errors.adminLastName = "Last Name is required.";

  // if (isEmpty(data.admin?.email)) {
  //   errors.adminEmail = "Admin Email is required.";
  // } else if (!emailRegex.test(data.admin.email)) {
  //   errors.adminEmail = "Please enter a valid admin email.";
  // }

  // if (isEmpty(data.admin?.username))
  //   errors.adminUsername = "Username is required.";

  // if (isEmpty(data.admin?.temporaryPassword)) {
  //   errors.adminTemporaryPassword = "Temporary Password is required.";
  // } else if (data.admin.temporaryPassword.length < 8) {
  //   errors.adminTemporaryPassword =
  //     "Password must contain at least 8 characters.";
  // }

  // // ==========================
  // // Regional Settings
  // // ==========================

  // if (isEmpty(data.regional?.timezone))
  //   errors.timezone = "Timezone is required.";

  // if (isEmpty(data.regional?.language))
  //   errors.language = "Language is required.";

  // if (isEmpty(data.regional?.currency))
  //   errors.currency = "Currency is required.";

  // if (isEmpty(data.regional?.dateFormat))
  //   errors.dateFormat = "Date Format is required.";

  // // ==========================
  // // Description
  // // ==========================

  // if (data.description && data.description.length > 500) {
  //   errors.description = "Maximum 500 characters allowed.";
  // }

  return errors;
};