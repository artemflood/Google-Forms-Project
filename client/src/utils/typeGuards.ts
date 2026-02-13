import { IForm, IQuestion, IResponse } from '../types';

export const isForm = (data: unknown): data is IForm => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'title' in data &&
    'questions' in data &&
    Array.isArray((data as IForm).questions)
  );
};

export const isQuestion = (data: unknown): data is IQuestion => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'type' in data &&
    'text' in data &&
    'required' in data
  );
};

export const isResponse = (data: unknown): data is IResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'formId' in data &&
    'answers' in data &&
    Array.isArray((data as IResponse).answers)
  );
};

