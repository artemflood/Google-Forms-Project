import { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useGetFormQuery } from '@store';
import { useFormFiller } from '@hooks/useFormFiller';
import { QuestionRendererWrapper, LoadingState, ErrorState } from '@components';
import { IQuestion } from '@types';
import { Button } from '@ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { MESSAGES } from '@constants/messages';
import { ROUTES, ROUTE_PARAMS } from '@constants/routes';
import { isValidFormId } from '@utils';
import { getErrorMessage } from '@utils';

export const FormFillerPage = () => {
  const navigate = useNavigate();
  const params = useParams<{ [ROUTE_PARAMS.FORM_ID]: string }>();
  const formId = params[ROUTE_PARAMS.FORM_ID];

  const { data, isLoading, error } = useGetFormQuery(formId || '');
  const questions = useMemo(() => data?.form?.questions || [], [data?.form?.questions]);
  const { answers, updateAnswer, submit, errors, isLoading: isSubmitting, isSubmitDisabled } = useFormFiller(
    formId || '',
    questions
  );

  const handleSubmit = useCallback(async () => {
    try {
      await submit();
      toast.success(MESSAGES.RESPONSE.SUBMITTED, {
        description: MESSAGES.RESPONSE.SUBMITTED_DESCRIPTION,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toast.error(MESSAGES.RESPONSE.SUBMIT_FAILED, {
        description: errorMessage,
      });
    }
  }, [submit]);

  const form = useMemo(() => data?.form, [data?.form]);

  if (!isValidFormId(formId)) {
    navigate(ROUTES.HOME);
    return null;
  }

  if (isLoading) {
    return <LoadingState message={MESSAGES.LOADING.FORM} />;
  }

  if (error || !form) {
    return <ErrorState message={MESSAGES.ERROR.FORM_NOT_FOUND} />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{form.title}</CardTitle>
          {form.description && <CardDescription>{form.description}</CardDescription>}
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {form.questions.map((question: IQuestion) => (
              <QuestionRendererWrapper
                key={question.id}
                question={question}
                value={answers[question.id]}
                onAnswerChange={updateAnswer}
                error={errors[question.id]}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
};
