import { IRTKQueryErrorData } from '../types/api';
import { MESSAGES } from '../constants/messages';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null) {
    const rtkError = error as IRTKQueryErrorData;
    if (rtkError?.data?.error) {
      return rtkError.data.error;
    }
    if (rtkError?.data?.errors?.[0]?.message) {
      return rtkError.data.errors[0].message;
    }
  }

  return MESSAGES.ERROR.UNKNOWN;
};

export const isNetworkError = (error: unknown): boolean => {
  if (typeof error === 'object' && error !== null) {
    const rtkError = error as IRTKQueryErrorData;
    return rtkError?.data?.error === 'FETCH_ERROR' || rtkError?.status === 'FETCH_ERROR';
  }
  return false;
};

