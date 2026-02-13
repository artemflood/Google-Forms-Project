export interface IUseFormFillerReturn {
  answers: Record<string, string | string[]>;
  updateAnswer: (questionId: string, value: string | string[]) => void;
  submit: () => Promise<void>;
  errors: Record<string, string>;
  hasErrors: boolean;
  isLoading: boolean;
  isSubmitDisabled: boolean;
}

