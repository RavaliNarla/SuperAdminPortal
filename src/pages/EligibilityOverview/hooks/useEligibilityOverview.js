import { useMemo } from "react";

const useEligibilityOverview = () => {
  const cards = useMemo(
    () => [
      {
        id: 1,
        title: "Categories & Age Relaxation",
        icon: "bi-people-fill",
        status: "Configured",
        type: "active",
        description: "8 active category rules · relaxation on",
        route: "/eligibility-configuration/categories",
      },

      {
        id: 2,
        title: "Inclusions",
        icon: "bi-shield-check",
        status: "Configured",
        type: "active",
        description: "1 active inclusion rule",
        route: "/eligibility-configuration/inclusions",
      },

      {
        id: 3,
        title: "Education & Experience Validation",
        icon: "bi-journal-check",
        status: "Not Configured",
        type: "inactive",
        description: "Education off · Experience off",
        route: "/eligibility-configuration/education-experience",
      },

      {
        id: 4,
        title: "Exclusions",
        icon: "bi-slash-circle",
        status: "Configured",
        type: "active",
        description: "4 active exclusion rules",
        route: "/eligibility-configuration/exclusions",
      },

      {
        id: 5,
        title: "Validation Workflow",
        icon: "bi-diagram-3",
        status: "Configured",
        type: "active",
        description: "Disqualifiers fixed · Qualifiers reorderable",
        route: "/validation-workflow",
      },

      {
        id: 6,
        title: "Vacancy & Marks Reservation",
        icon: "bi-bar-chart",
        status: "Configured",
        type: "active",
        description: "Category-wise on · State-wise on",
        route: "/eligibility-configuration/vacancy-breakdown",
      },
    ],
    [],
  );

  return {
    cards,
  };
};

export default useEligibilityOverview;
