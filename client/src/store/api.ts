import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from './graphqlBaseQuery';

export const api = createApi({
  baseQuery: graphqlBaseQuery(),
  tagTypes: ['Forms', 'Form', 'Responses'] as const,
  endpoints: () => ({}),
});

