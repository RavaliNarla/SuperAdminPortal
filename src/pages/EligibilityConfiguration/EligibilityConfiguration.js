import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../css/EligibilityConfiguration.css";

const tabs = [
  {
    name: "Categories & Age Relaxation",
    icon: "bi bi-people-fill",
    path: "/eligibility-configuration/categories",
  },
  {
    name: "Inclusions",
    icon: "bi bi-shield-check",
    path: "/eligibility-configuration/inclusions",
  },
  {
    name: "Education & Experience",
    icon: "bi bi-journal-check",
    path: "/eligibility-configuration/education-experience",
  },
  {
    name: "Exclusions",
    icon: "bi bi-slash-circle",
    path: "/eligibility-configuration/exclusions",
  },
  {
    name: "Vacancy & Marks",
    icon: "bi bi-bar-chart",
    path: "/eligibility-configuration/vacancy-breakdown",
  },
];

const EligibilityConfiguration = () => {
  return (
    <div className="eligibility-page">

      <div className="page-header">

        <div className="page-header-left">

          <h2 className="page-title">
            Eligibility Configuration
          </h2>

          <p className="page-subtitle">
            Configure reservation categories, validation rules,
            inclusions, exclusions and vacancy reservation
            settings for your recruitment workflow.
          </p>

        </div>

      </div>

      <div className="eligibility-tabs">

        {tabs.map((tab) => (

          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              isActive
                ? "eligibility-tab active"
                : "eligibility-tab"
            }
          >
            <i className={tab.icon}></i>

            <span>{tab.name}</span>

          </NavLink>

        ))}

      </div>

      <div className="eligibility-content">

        <Outlet />

      </div>

    </div>
  );
};

export default EligibilityConfiguration;