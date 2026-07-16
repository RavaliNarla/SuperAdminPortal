// Keyed by organization code (matches the "code" field on each organization
// and the Recruitment Portal's login URL key, e.g. /bob/login), then by
// portal ("recruitment" or "candidate"), then by form key.
export const formSchemas = {
  bob: {
    recruitment: {
      requisition: {
        fields: [
          {
            id: 'field-department-code',
            type: 'text',
            label: 'Department Code',
            required: true,
            placeholder: 'Enter department code',
            maxLength: 20,
          },
          {
            id: 'field-recruitment-drive',
            type: 'dropdown',
            label: 'Recruitment Drive',
            required: false,
            options: ['Campus', 'Lateral', 'Walk-in'],
          },
        ],
      },
      jobPosting: {
        fields: [
          {
            id: 'field-position-reference-code',
            type: 'text',
            label: 'Position Reference Code',
            required: false,
            placeholder: 'Enter internal position reference code',
            maxLength: 30,
          },
        ],
      },
    },
  },
};
