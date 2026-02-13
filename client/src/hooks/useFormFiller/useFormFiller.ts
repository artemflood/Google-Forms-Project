import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IQuestion, QuestionType, IAnswerInput } from '../../types';
import { useSubmitResponseMutation } from '../../store';
import { IUseFormFillerReturn } from './types';
import { MESSAGES } from '../../constants/messages';
import { getErrorMessage } from '../../utils/errorHandler';

export const useFormFiller = (formId: string, questions: IQuestion[]): IUseFormFillerReturn => {
  const navigate = useNavigate();
  const [submitResponse, { isLoading }] = useSubmitResponseMutation();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateAnswer = useCallback((questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[questionId];
      return newErrors;
    });
  }, []);

  const validateAnswers = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    questions.forEach((question) => {
      if (question.required) {
        const answer = answers[question.id];
        if (!answer || (Array.isArray(answer) && answer.length === 0) || (typeof answer === 'string' && !answer.trim())) {
          newErrors[question.id] = MESSAGES.RESPONSE.FIELD_REQUIRED;
        }
      }

      if (question.type === QuestionType.CHECKBOX && Array.isArray(answers[question.id])) {
        const checkedOptions = answers[question.id] as string[];
        if (checkedOptions.length === 0 && question.required) {
          newErrors[question.id] = MESSAGES.RESPONSE.AT_LEAST_ONE_OPTION;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [answers, questions]);

  const submit = useCallback(async () => {
    if (!validateAnswers()) {
      return;
    }

    const answerInputs: IAnswerInput[] = questions
      .map((question) => {
        const answer = answers[question.id];
        if (!answer) return null;

        if (Array.isArray(answer)) {
        return answer.map((value) => ({
          questionId: question.id,
          value,
        }));
      }

      return {
        questionId: question.id,
        value: String(answer),
      };
    })
    .filter((answer): answer is IAnswerInput => answer !== null)
      .flat();

    try {
      await submitResponse({
        formId,
        answers: answerInputs,
      }).unwrap();

      navigate(`/forms/${formId}/responses`);
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error));
    }
  }, [formId, answers, questions, validateAnswers, submitResponse, navigate]);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  return {
    answers,
    updateAnswer,
    submit,
    errors,
    hasErrors,
    isLoading,
  };
};

