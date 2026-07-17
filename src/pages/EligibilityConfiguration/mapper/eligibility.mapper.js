export const mapVacancyAndMarksReservation = (data = {}) => ({
  examConfigurationRequired:
    data.examConfigurationRequired ?? false,

  interviewConfigurationRequired:
    data.interviewConfigurationRequired ?? false,

  categoryWiseDistribution:
    data.categoryWiseDistribution ?? false,

  stateWiseDistribution:
    data.stateWiseDistribution ?? false,

  categoryMarks:
    data.categoryMarks || [],

  stateMarks:
    data.stateMarks || [],
});

export const mapCategoriesAndAgeRelaxations = (data = {}) => ({
  applyRelaxation: data.applyRelaxation ?? false,
  reservedVacancyOnly: data.reservedVacancyOnly ?? false,
  allowMultipleRelaxation: data.allowMultipleRelaxation ?? false,
  maximumRelaxation: data.maximumRelaxation ?? 0,
  categories: data.categories || [],
});