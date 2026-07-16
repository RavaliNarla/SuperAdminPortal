import EligibilityConfiguration from "./EligibilityConfiguration";

import CategoriesAgeRelaxation from "./components/CategoriesAgeRelaxation";
import Inclusions from "./components/Inclusions";
import EducationExperience from "./components/EducationExperience";
import Exclusions from "./components/Exclusions";
import VacancyBreakdown from "./components/VacancyBreakdown";

const eligibilityRoutes = {
  path: "eligibility-configuration",
  element: <EligibilityConfiguration />,
  children: [
    {
      index: true,
      element: <CategoriesAgeRelaxation />,
    },
    {
      path: "categories",
      element: <CategoriesAgeRelaxation />,
    },
    {
      path: "inclusions",
      element: <Inclusions />,
    },
    {
      path: "education-experience",
      element: <EducationExperience />,
    },
    {
      path: "exclusions",
      element: <Exclusions />,
    },
    {
      path: "vacancy-breakdown",
      element: <VacancyBreakdown />,
    },
  ],
};

export default eligibilityRoutes;