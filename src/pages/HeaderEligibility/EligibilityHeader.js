import React, { useEffect } from "react";
import "./EligibilityHeader.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchOrganizations } from "../../pages/organizations/hooks/organizationThunk";
import { setSelectedOrganization } from "../../pages/EligibilityConfiguration/eligibilitySlice/eligibilitySlice";

const EligibilityHeader = () => {
  const dispatch = useAppDispatch();

  const organizations = useAppSelector(
    (state) => state.organizations.items
  );

  const selectedOrganization = useAppSelector(
    (state) => state.eligibility.selectedOrganization
  );

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (organizations.length > 0 && !selectedOrganization) {
      dispatch(setSelectedOrganization(organizations[0].id));
    }
  }, [organizations, selectedOrganization, dispatch]);

  return (
    <div className="organization-header">
      <label className="organization-label">Organization</label>

      <select
        className="form-select organization-dropdown"
        value={selectedOrganization}
        onChange={(e) =>
          dispatch(setSelectedOrganization(e.target.value))
        }
      >
        {organizations.map((organization) => (
          <option key={organization.id} value={organization.id}>
            {organization.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EligibilityHeader;
// import React from "react";
// import "./EligibilityHeader.css";

// import useEligibilityHeader from "./hooks/useEligibilityHeader";

// const EligibilityHeader = () => {
//   const { organizations, selectedOrganization, setSelectedOrganization } =
//     useEligibilityHeader();

//   return (
//     <div className="organization-header">
//       <label className="organization-label">Organization</label>
//       <select
//         className="form-select organization-dropdown"
//         value={selectedOrganization}
//         onChange={(e) => setSelectedOrganization(e.target.value)}
//       >
//         {organizations.map((organization) => (
//           <option key={organization.id} value={organization.id}>
//             {organization.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default EligibilityHeader;
