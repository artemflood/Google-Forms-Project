import { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetFormQuery, useGetResponsesQuery } from '../store';
import { IResponse } from '../types';
import { Card, CardContent } from '../components/ui/card';
import { LoadingState, ErrorState, ResponseCard } from '../components';
import { MESSAGES } from '../constants/messages';
import { ROUTES, ROUTE_PARAMS } from '../constants/routes';
import { isValidFormId } from '../utils/validators';

export const FormResponsesPage = () => {
  const navigate = useNavigate();
  const params = useParams<{ [ROUTE_PARAMS.FORM_ID]: string }>();
  const formId = params[ROUTE_PARAMS.FORM_ID];

  const { data: formData, isLoading: formLoading } = useGetFormQuery(formId || '');
  const { data: responsesData, isLoading: responsesLoading } = useGetResponsesQuery(formId || '');

  const form = useMemo(() => formData?.form, [formData?.form]);
  const responses = useMemo(() => responsesData?.responses || [], [responsesData?.responses]);

  const getAnswerForQuestion = useCallback((response: IResponse, questionId: string): string[] => {
    return response.answers
      .filter((a: { questionId: string; value: string }) => a.questionId === questionId)
      .map((a: { questionId: string; value: string }) => a.value);
  }, []);

  const responsesCount = useMemo(() => responses.length, [responses.length]);

  if (!isValidFormId(formId)) {
    navigate(ROUTES.HOME);
    return null;
  }

  if (formLoading || responsesLoading) {
    return <LoadingState message={MESSAGES.LOADING.RESPONSES} />;
  }

  if (!form) {
    return <ErrorState message={MESSAGES.ERROR.RESPONSES_NOT_FOUND} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Responses for: {form.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {responsesCount} response{responsesCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {responses.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">{MESSAGES.EMPTY.NO_RESPONSES}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {responses.map((response: IResponse) => (
            <ResponseCard
              key={response.id}
              response={response}
              questions={form.questions}
              getAnswerForQuestion={getAnswerForQuestion}
            />
          ))}
        </div>
      )}
    </div>
  );
};
