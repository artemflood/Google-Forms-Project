export const ROUTES = {
  HOME: '/',
  CREATE_FORM: '/forms/new',
  FILL_FORM: (id: string) => `/forms/${id}/fill`,
  FORM_RESPONSES: (id: string) => `/forms/${id}/responses`,
} as const;

export const ROUTE_PARAMS = {
  FORM_ID: 'id',
} as const;
