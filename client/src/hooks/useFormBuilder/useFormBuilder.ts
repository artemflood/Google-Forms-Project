import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionType, IQuestionInput } from '../../types';
import { useCreateFormMutation } from '../../store';
import { IUseFormBuilderReturn, IQuestionBuilder } from './types';
import { MESSAGES } from '../../constants/messages';
import { getErrorMessage } from '../../utils/errorHandler';

export const useFormBuilder = (): IUseFormBuilderReturn => {
  const navigate = useNavigate();
  const [createForm, { isLoading }] = useCreateFormMutation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<IQuestionBuilder[]>([]);

  const addQuestion = useCallback((type: QuestionType) => {
    const newQuestion: IQuestionBuilder = {
      id: `temp-${Date.now()}-${Math.random()}`,
      type,
      text: '',
      required: false,
      options: type === QuestionType.MULTIPLE_CHOICE || type === QuestionType.CHECKBOX ? [''] : [],
    };
    setQuestions((prev) => [...prev, newQuestion]);
  }, []);

  const updateQuestion = useCallback((id: string, updates: Partial<IQuestionBuilder>) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  }, []);

  const removeQuestion = useCallback((id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const addOption = useCallback((questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, options: [...q.options, ''] } : q
      )
    );
  }, []);

  const removeOption = useCallback((questionId: string, optionIndex: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((_, i) => i !== optionIndex) }
          : q
      )
    );
  }, []);

  const updateOption = useCallback((questionId: string, optionIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, i) => (i === optionIndex ? value : opt)),
            }
          : q
      )
    );
  }, []);

  const saveForm = useCallback(async () => {
    if (!title.trim()) {
      throw new Error(MESSAGES.FORM.TITLE_REQUIRED);
    }

    const validQuestions = questions.filter((q) => q.text.trim());
    if (validQuestions.length === 0) {
      throw new Error(MESSAGES.FORM.AT_LEAST_ONE_QUESTION);
    }

    const questionInputs: IQuestionInput[] = validQuestions.map((q) => {
      const base: IQuestionInput = {
        type: q.type,
        text: q.text.trim(),
        required: q.required,
      };

      if (q.options.length > 0) {
        const validOptions = q.options.filter((opt) => opt.trim());
        if (validOptions.length === 0) {
          throw new Error(MESSAGES.FORM.QUESTION_MUST_HAVE_OPTIONS(q.text));
        }
        base.options = validOptions;
      }

      return base;
    });

    try {
      const result = await createForm({
        title: title.trim(),
        description: description.trim() || undefined,
        questions: questionInputs,
      }).unwrap();

      let formId: string | undefined;
      if (result && typeof result === 'object') {
        if ('createForm' in result && result.createForm && typeof result.createForm === 'object' && 'id' in result.createForm) {
          formId = result.createForm.id as string;
        } else if ('id' in result) {
          formId = result.id as string;
        }
      }

      if (!formId) {
        throw new Error(MESSAGES.ERROR.UNKNOWN);
      }

      navigate(`/forms/${formId}/fill`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(getErrorMessage(error));
    }
  }, [title, description, questions, createForm, navigate]);

  return {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    addQuestion,
    updateQuestion,
    removeQuestion,
    addOption,
    removeOption,
    updateOption,
    saveForm,
    isLoading,
  };
};

