import { api } from './api';
import {
  GET_FORMS,
  GET_FORM,
  GET_RESPONSES,
  CREATE_FORM,
  DELETE_FORM,
  SUBMIT_RESPONSE,
} from '@graphql/queries';
import { IQuestionInput, ICreateFormResponse } from '@types';

export const formsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getForms: builder.query({
      query: () => ({
        document: GET_FORMS,
      }),
      providesTags: [{ type: 'Forms' }],
    }),
    getForm: builder.query({
      query: (id: string) => ({
        document: GET_FORM,
        variables: { id },
      }),
      providesTags: (_result, _error, id) => [{ type: 'Form', id }],
    }),
    getResponses: builder.query({
      query: (formId: string) => ({
        document: GET_RESPONSES,
        variables: { formId },
      }),
      providesTags: (_result, _error, formId) => [{ type: 'Responses', id: formId }],
    }),
    createForm: builder.mutation({
      query: (variables: {
        title: string;
        description?: string;
        questions: IQuestionInput[];
      }) => ({
        document: CREATE_FORM,
        variables,
      }),
      transformResponse: (response: unknown): ICreateFormResponse['createForm'] => {
        const data = response as ICreateFormResponse;
        if (!data?.createForm) {
          throw new Error('Invalid response structure from createForm mutation');
        }
        return data.createForm;
      },
      invalidatesTags: [{ type: 'Forms' }],
    }),
    deleteForm: builder.mutation({
      query: (id: string) => ({
        document: DELETE_FORM,
        variables: { id },
      }),
      invalidatesTags: [{ type: 'Forms' }],
    }),
    submitResponse: builder.mutation({
      query: (variables: { formId: string; answers: Array<{ questionId: string; value: string }> }) => ({
        document: SUBMIT_RESPONSE,
        variables,
      }),
      invalidatesTags: (_result, _error, { formId }) => [{ type: 'Responses', id: formId }],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useGetResponsesQuery,
  useCreateFormMutation,
  useDeleteFormMutation,
  useSubmitResponseMutation,
} = formsApi;

