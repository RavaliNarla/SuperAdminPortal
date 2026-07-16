// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// import { fetchOrganizations } from "../../../features/organizations/organizationThunk";

// const useEligibilityHeader = () => {
//   const navigate = useNavigate();

//   const location = useLocation();
//    const organizations = useAppSelector((state) => state.organizations.items);

//     const dispatch = useAppDispatch();
//     useEffect(() => {
//       dispatch(fetchOrganizations());
//     }, [dispatch]);

//   // const organizations = [
//   //   {
//   //     id: 1,
//   //     name: "Bank of Baroda",
//   //   },

//   //   {
//   //     id: 2,
//   //     name: "SBI",
//   //   },

//   //   {
//   //     id: 3,
//   //     name: "Canara Bank",
//   //   },
//   // ];

//   const [selectedOrganization, setSelectedOrganization] = useState(1);

//   const tabs = [
//     {
//       name: "Overview",
//       icon: "bi bi-speedometer2",
//       path: "/eligibility-overview",
//     },

//     {
//       name: "Eligibility Configuration",
//       icon: "bi bi-card-checklist",
//       path: "/eligibility-configuration/categories",
//     },

//     {
//       name: "Validation Workflow",
//       icon: "bi bi-diagram-3",
//       path: "/validation-workflow",
//     },
//   ];

//   const handleTabClick = (path) => {
//     navigate(path);
//   };

//   const isActive = (path) => {
//     if (path === "/eligibility-configuration/categories") {
//       return location.pathname.startsWith("/eligibility-configuration");
//     }

//     return location.pathname === path;
//   };

//   return {
//     tabs,

//     organizations,

//     selectedOrganization,

//     setSelectedOrganization,

//     handleTabClick,

//     isActive,
//   };
// };

// export default useEligibilityHeader;

import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchOrganizations } from "../../../features/organizations/organizationThunk";

const useEligibilityHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const orgId = searchParams.get("orgId");

  const dispatch = useAppDispatch();

  const organizations = useAppSelector((state) => state.organizations.items);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  // Selected Organization
  const [selectedOrganization, setSelectedOrganization] = useState("");
  // Set first organization once data is loaded
  useEffect(() => {
    if (organizations.length === 0) return;

    if (orgId) {
      setSelectedOrganization(orgId);
    } else {
      setSelectedOrganization(organizations[0].id);
    }
  }, [organizations, orgId]);

  const tabs = [
    {
      name: "Overview",
      icon: "bi bi-speedometer2",
      path: "/eligibility-overview",
    },
    {
      name: "Eligibility Configuration",
      icon: "bi bi-card-checklist",
      path: "/eligibility-configuration/categories",
    },
    {
      name: "Validation Workflow",
      icon: "bi bi-diagram-3",
      path: "/validation-workflow",
    },
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === "/eligibility-configuration/categories") {
      return location.pathname.startsWith("/eligibility-configuration");
    }

    return location.pathname === path;
  };

  return {
    tabs,
    organizations,
    selectedOrganization,
    setSelectedOrganization,
    handleTabClick,
    isActive,
  };
};

export default useEligibilityHeader;
