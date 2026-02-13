export enum QuestionType {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options: string[] | null;
}

export interface Form {
  id: string;
  title: string;
  description: string | null;
  questions: Question[];
  createdAt: string;
}

export interface Answer {
  questionId: string;
  value: string;
}

export interface Response {
  id: string;
  formId: string;
  answers: Answer[];
  submittedAt: string;
}

export interface QuestionInput {
  type: QuestionType;
  text: string;
  required: boolean;
  options?: string[] | null;
}

export interface AnswerInput {
  questionId: string;
  value: string;
}


