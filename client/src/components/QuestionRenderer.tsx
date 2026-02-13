import { memo, useMemo, useCallback, ChangeEvent } from 'react';
import { IQuestion, QuestionType } from '@types';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { Checkbox } from '@ui/checkbox';
import { cn } from '@lib/utils';

interface IQuestionRendererProps {
  question: IQuestion;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
}

export const QuestionRenderer = memo(({ question, value, onChange, error }: IQuestionRendererProps) => {
  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleDateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleRadioChange = useCallback(
    (val: string) => {
      onChange(val);
    },
    [onChange]
  );

  const handleCheckboxChange = useCallback(
    (option: string, checked: boolean) => {
      const checkedValues = (value as string[]) || [];
      if (checked) {
        onChange([...checkedValues, option]);
      } else {
        onChange(checkedValues.filter((v) => v !== option));
      }
    },
    [value, onChange]
  );

  const inputClassName = useMemo(() => cn(error && 'border-destructive'), [error]);

  const renderInput = useMemo(() => {
    switch (question.type) {
      case QuestionType.TEXT:
        return (
          <Input
            type="text"
            className={inputClassName}
            value={(value as string) || ''}
            onChange={handleTextChange}
            placeholder="Your answer"
          />
        );

      case QuestionType.DATE:
        return (
          <Input
            type="date"
            className={inputClassName}
            value={(value as string) || ''}
            onChange={handleDateChange}
          />
        );

      case QuestionType.MULTIPLE_CHOICE:
        return (
          <RadioGroup
            value={(value as string) || ''}
            onValueChange={handleRadioChange}
            className="space-y-3"
          >
            {question.options?.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label
                  htmlFor={`${question.id}-${index}`}
                  className="font-normal cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case QuestionType.CHECKBOX:
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => {
              const checkedValues = (value as string[]) || [];
              const isChecked = checkedValues.includes(option);
              return (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${question.id}-${index}`}
                    checked={isChecked}
                    onCheckedChange={(checked: boolean) => handleCheckboxChange(option, checked)}
                  />
                  <Label
                    htmlFor={`${question.id}-${index}`}
                    className="font-normal cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  }, [question.type, question.id, question.options, value, inputClassName, handleTextChange, handleDateChange, handleRadioChange, handleCheckboxChange]);

  return (
    <div className="space-y-3 pb-6 border-b border-border last:border-0">
      <Label className="text-base font-medium">
        {question.text}
        {question.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderInput}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
});

QuestionRenderer.displayName = 'QuestionRenderer';
