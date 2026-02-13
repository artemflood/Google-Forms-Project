import { QuestionType } from '@types';

export interface IQuestionBuilder {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options: string[];
}

export interface IUseFormBuilderReturn {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  questions: IQuestionBuilder[];
  addQuestion: (type: QuestionType) => void;
  updateQuestion: (id: string, updates: Partial<IQuestionBuilder>) => void;
  removeQuestion: (id: string) => void;
  addOption: (questionId: string) => void;
  removeOption: (questionId: string, optionIndex: number) => void;
  updateOption: (questionId: string, optionIndex: number, value: string) => void;
  saveForm: () => Promise<void>;
  isLoading: boolean;
}

