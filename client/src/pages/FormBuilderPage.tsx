import { useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { useFormBuilder, IQuestionBuilder } from '../hooks/useFormBuilder';
import { QuestionType } from '../types';
import { QuestionEditor } from '../components';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { MESSAGES } from '../constants/messages';
import { getErrorMessage } from '../utils/errorHandler';

export const FormBuilderPage = () => {
  const {
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
  } = useFormBuilder();

  const handleSave = useCallback(async () => {
    try {
      await saveForm();
      toast.success(MESSAGES.FORM.CREATED, {
        description: MESSAGES.FORM.CREATED_DESCRIPTION,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toast.error(MESSAGES.FORM.SAVE_FAILED, {
        description: errorMessage,
      });
    }
  }, [saveForm]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, [setTitle]);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, [setDescription]);

  const handleAddTextQuestion = useCallback(() => {
    addQuestion(QuestionType.TEXT);
  }, [addQuestion]);

  const handleAddMultipleChoiceQuestion = useCallback(() => {
    addQuestion(QuestionType.MULTIPLE_CHOICE);
  }, [addQuestion]);

  const handleAddCheckboxQuestion = useCallback(() => {
    addQuestion(QuestionType.CHECKBOX);
  }, [addQuestion]);

  const handleAddDateQuestion = useCallback(() => {
    addQuestion(QuestionType.DATE);
  }, [addQuestion]);

  const isSaveDisabled = useMemo(() => isLoading || !title.trim(), [isLoading, title]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Create New Form</h1>

      <Card>
        <CardHeader>
          <CardTitle>Form Details</CardTitle>
          <CardDescription>Set the title and description for your form</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>
              Form Title <span className="text-destructive">*</span>
            </Label>
            <Input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Untitled Form"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Form description (optional)"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Questions</CardTitle>
              <CardDescription>Add questions to your form</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddTextQuestion}
              >
                + Text
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddMultipleChoiceQuestion}
              >
                + Multiple Choice
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddCheckboxQuestion}
              >
                + Checkbox
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddDateQuestion}
              >
                + Date
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>{MESSAGES.EMPTY.NO_QUESTIONS}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
                  <QuestionEditor
                    key={question.id}
                    question={question}
                    index={index}
                    onUpdate={(updates: Partial<IQuestionBuilder>) => updateQuestion(question.id, updates)}
                    onRemove={() => removeQuestion(question.id)}
                    onAddOption={() => addOption(question.id)}
                    onRemoveOption={(optionIndex: number) => removeOption(question.id, optionIndex)}
                    onUpdateOption={(optionIndex: number, value: string) => updateOption(question.id, optionIndex, value)}
                  />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaveDisabled}>
          {isLoading ? 'Saving...' : 'Save Form'}
        </Button>
      </div>
    </div>
  );
};
