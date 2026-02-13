import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTES } from '../constants/routes';

export const useSafeParams = <T extends Record<string, string>>(): T => {
  const params = useParams<T>();
  const navigate = useNavigate();

  useEffect(() => {
    const hasEmptyParams = Object.values(params).some(
      (value) => !value || (typeof value === 'string' && value.trim() === '')
    );

    if (hasEmptyParams) {
      navigate(ROUTES.HOME);
    }
  }, [params, navigate]);

  return params as T;
};

