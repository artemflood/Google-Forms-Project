import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum QuestionType {
    TEXT
    MULTIPLE_CHOICE
    CHECKBOX
    DATE
  }

  type Question {
    id: ID!
    type: QuestionType!
    text: String!
    required: Boolean!
    options: [String!]
  }

  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
    createdAt: String!
  }

  type Answer {
    questionId: ID!
    value: String!
  }

  type Response {
    id: ID!
    formId: ID!
    answers: [Answer!]!
    submittedAt: String!
  }

  input QuestionInput {
    type: QuestionType!
    text: String!
    required: Boolean!
    options: [String!]
  }

  input AnswerInput {
    questionId: ID!
    value: String!
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(title: String!, description: String, questions: [QuestionInput!]!): Form!
    deleteForm(id: ID!): Boolean!
    submitResponse(formId: ID!, answers: [AnswerInput!]!): Response!
  }
`;


