import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';
import { IGraphQLResponseError, IRTKQueryError } from '../types/errors';

const client = new GraphQLClient('/graphql');

export const graphqlBaseQuery =
  (): BaseQueryFn<
    { document: RequestDocument; variables?: Variables },
    unknown,
    IRTKQueryError
  > =>
  async ({ document, variables }) => {
    try {
      const result = await client.request(document, variables);
      return { data: result };
    } catch (error) {
      const graphqlError = error as IGraphQLResponseError;
      const firstError = graphqlError.response?.errors?.[0] || graphqlError;
      return {
        error: {
          status: graphqlError.response?.status || 'FETCH_ERROR',
          error: firstError.message || 'Unknown error',
          data: graphqlError.response?.errors || error,
        },
      };
    }
  };

