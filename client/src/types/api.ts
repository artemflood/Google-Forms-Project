export interface ICreateFormResponse {
  createForm: {
    id: string;
    title: string;
    description: string | null;
    createdAt: string;
    questions: unknown[];
  };
}

export interface IRTKQueryErrorData {
  status?: number | string;
  error?: string;
  data?: {
    error?: string;
    errors?: Array<{ message: string }>;
  };
}

