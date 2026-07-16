import React from "react";
import "./EligibilityHeader.css";

import useEligibilityHeader from "./hooks/useEligibilityHeader";

const EligibilityHeader = () => {
  const { organizations, selectedOrganization, setSelectedOrganization } =
    useEligibilityHeader();

  return (
    <div className="organization-header">
      <label className="organization-label">Organization</label>
      <select
        className="form-select organization-dropdown"
        value={selectedOrganization}
        onChange={(e) => setSelectedOrganization(e.target.value)}
      >
        {organizations.map((organization) => (
          <option key={organization.id} value={organization.id}>
            {organization.name}
          </option>
        ))}
      </select>
      {/* <select
        className="form-select organization-dropdown"
        value={selectedOrganization}
        onChange={(e) => setSelectedOrganization(Number(e.target.value))}
      >
        {organizations.map((organization) => (
          <option key={organization.id} value={organization.id}>
            {organization.name}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default EligibilityHeader;
