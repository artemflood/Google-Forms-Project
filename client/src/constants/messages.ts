export const MESSAGES = {
  FORM: {
    CREATED: 'Form created successfully!',
    CREATED_DESCRIPTION: 'Your form has been saved and is ready to use.',
    DELETED: 'Form deleted successfully',
    DELETE_FAILED: 'Failed to delete form',
    DELETE_FAILED_DESCRIPTION: 'Please try again.',
    SAVE_FAILED: 'Failed to save form',
    TITLE_REQUIRED: 'Form title is required',
    AT_LEAST_ONE_QUESTION: 'At least one question is required',
    QUESTION_MUST_HAVE_OPTIONS: (text: string) => `Question "${text}" must have at least one option`,
  },
  RESPONSE: {
    SUBMITTED: 'Form submitted successfully!',
    SUBMITTED_DESCRIPTION: 'Your response has been recorded.',
    SUBMIT_FAILED: 'Failed to submit form',
    FIELD_REQUIRED: 'This field is required',
    AT_LEAST_ONE_OPTION: 'At least one option must be selected',
  },
  LOADING: {
    FORMS: 'Loading forms...',
    FORM: 'Loading form...',
    RESPONSES: 'Loading responses...',
  },
  ERROR: {
    LOAD_FORMS: 'Error loading forms. Please try again.',
    FORM_NOT_FOUND: 'Form not found or error loading form.',
    RESPONSES_NOT_FOUND: 'Form not found.',
    UNKNOWN: 'An unexpected error occurred',
  },
  EMPTY: {
    NO_FORMS: 'No forms created yet.',
    NO_RESPONSES: 'No responses yet. Share the form to collect responses.',
    NO_QUESTIONS: 'No questions yet. Add a question to get started.',
  },
  CONFIRMATION: {
    DELETE_TITLE: 'Delete Form',
    DELETE_DESCRIPTION: (title: string) =>
      `Are you sure you want to delete "${title}"? This action cannot be undone and will also delete all responses for this form.`,
    DELETE_DEFAULT: 'Are you sure you want to delete this form?',
  },
} as const;

