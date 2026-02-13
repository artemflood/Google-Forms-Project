export interface IGraphQLError {
  message: string;
  extensions?: Record<string, unknown>;
}

export interface IGraphQLResponseError {
  response?: {
    status?: number;
    errors?: IGraphQLError[];
  };
  message?: string;
}

export interface IRTKQueryError {
  status?: number | string;
  error?: string;
  data?: unknown;
}

