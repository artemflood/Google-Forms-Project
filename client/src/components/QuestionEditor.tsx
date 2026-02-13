import { memo, useMemo, useCallback } from 'react';
import { IQuestionBuilder } from '../hooks/useFormBuilder';
import { QuestionType } from '../types';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent } from './ui/card';
import { X } from 'lucide-react';

interface IQuestionEditorProps {
  question: IQuestionBuilder;
  index: number;
  onUpdate: (updates: Partial<IQuestionBuilder>) => void;
  onRemove: () => void;
  onAddOption: () => void;
  onRemoveOption: (optionIndex: number) => void;
  onUpdateOption: (optionIndex: number, value: string) => void;
}

export const QuestionEditor = memo(({
  question,
  index,
  onUpdate,
  onRemove,
  onAddOption,
  onRemoveOption,
  onUpdateOption,
}: IQuestionEditorProps) => {
  const needsOptions = useMemo(
    () => question.type === QuestionType.MULTIPLE_CHOICE || question.type === QuestionType.CHECKBOX,
    [question.type]
  );

  const questionTypeLabel = useMemo(
    () => question.type.replace('_', ' '),
    [question.type]
  );

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ text: e.target.value });
    },
    [onUpdate]
  );

  const handleRequiredChange = useCallback(
    (checked: boolean) => {
      onUpdate({ required: checked });
    },
    [onUpdate]
  );

  const handleOptionChange = useCallback(
    (optIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateOption(optIndex, e.target.value);
    },
    [onUpdateOption]
  );

  const handleRemoveOption = useCallback(
    (optIndex: number) => {
      onRemoveOption(optIndex);
    },
    [onRemoveOption]
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Question {index + 1}</span>
            <Button type="button" variant="ghost" size="sm" onClick={onRemove} className="text-destructive hover:text-destructive">
              Remove
            </Button>
          </div>

          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {questionTypeLabel}
          </div>

          <Input
            type="text"
            value={question.text}
            onChange={handleTextChange}
            placeholder="Question text"
          />

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`required-${question.id}`}
              checked={question.required}
              onCheckedChange={handleRequiredChange}
            />
            <Label htmlFor={`required-${question.id}`} className="font-normal cursor-pointer">
              Required
            </Label>
          </div>

          {needsOptions && (
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Options</Label>
                <Button type="button" variant="outline" size="sm" onClick={onAddOption}>
                  + Add Option
                </Button>
              </div>
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(optIndex, e)}
                      placeholder={`Option ${optIndex + 1}`}
                      className="flex-1"
                    />
                    {question.options.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveOption(optIndex)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

QuestionEditor.displayName = 'QuestionEditor';
