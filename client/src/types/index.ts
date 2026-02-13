export enum QuestionType {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}

export interface IQuestion {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options: string[] | null;
}

export interface IForm {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  questions: IQuestion[];
}

export interface IAnswer {
  questionId: string;
  value: string;
}

export interface IResponse {
  id: string;
  formId: string;
  answers: IAnswer[];
  submittedAt: string;
}

export interface IQuestionInput {
  type: QuestionType;
  text: string;
  required: boolean;
  options?: string[] | null;
}

export interface IAnswerInput {
  questionId: string;
  value: string;
}

