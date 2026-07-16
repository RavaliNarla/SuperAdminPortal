import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useEligibilityHeader = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const organizations = [
    {
      id: 1,
      name: "Bank of Baroda",
    },

    {
      id: 2,
      name: "SBI",
    },

    {
      id: 3,
      name: "Canara Bank",
    },
  ];

  const [selectedOrganization, setSelectedOrganization] = useState(1);

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
