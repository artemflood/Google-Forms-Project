import { gql } from 'graphql-request';

export const GET_FORMS = gql`
  query GetForms {
    forms {
      id
      title
      description
      createdAt
      questions {
        id
        type
        text
        required
        options
      }
    }
  }
`;

export const GET_FORM = gql`
  query GetForm($id: ID!) {
    form(id: $id) {
      id
      title
      description
      createdAt
      questions {
        id
        type
        text
        required
        options
      }
    }
  }
`;

export const GET_RESPONSES = gql`
  query GetResponses($formId: ID!) {
    responses(formId: $formId) {
      id
      formId
      submittedAt
      answers {
        questionId
        value
      }
    }
  }
`;

export const CREATE_FORM = gql`
  mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]!) {
    createForm(title: $title, description: $description, questions: $questions) {
      id
      title
      description
      createdAt
      questions {
        id
        type
        text
        required
        options
      }
    }
  }
`;

export const DELETE_FORM = gql`
  mutation DeleteForm($id: ID!) {
    deleteForm(id: $id)
  }
`;

export const SUBMIT_RESPONSE = gql`
  mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
    submitResponse(formId: $formId, answers: $answers) {
      id
      formId
      submittedAt
      answers {
        questionId
        value
      }
    }
  }
`;


