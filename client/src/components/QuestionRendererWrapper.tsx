import { memo, useCallback, useMemo } from 'react';
import { IQuestion, QuestionType } from '../types';
import { QuestionRenderer } from './QuestionRenderer';

interface IQuestionRendererWrapperProps {
  question: IQuestion;
  value: string | string[];
  onAnswerChange: (questionId: string, value: string | string[]) => void;
  error?: string;
}

export const QuestionRendererWrapper = memo(
  ({ question, value, onAnswerChange, error }: IQuestionRendererWrapperProps) => {
    const handleChange = useCallback(
      (newValue: string | string[]) => {
        onAnswerChange(question.id, newValue);
      },
      [question.id, onAnswerChange]
    );

    const displayValue = useMemo(() => {
      if (value !== undefined && value !== null) {
        return value;
      }
      return question.type === QuestionType.CHECKBOX ? [] : '';
    }, [value, question.type]);

    return (
      <QuestionRenderer
        question={question}
        value={displayValue}
        onChange={handleChange}
        error={error}
      />
    );
  }
);

QuestionRendererWrapper.displayName = 'QuestionRendererWrapper';

