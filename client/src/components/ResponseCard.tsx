import { memo, useMemo } from 'react';
import { IResponse, IQuestion } from '../types';
import { formatDate } from '../utils/formatters';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';

interface IResponseCardProps {
  response: IResponse;
  questions: IQuestion[];
  getAnswerForQuestion: (response: IResponse, questionId: string) => string[];
}

export const ResponseCard = memo(({ response, questions, getAnswerForQuestion }: IResponseCardProps) => {
  const formattedDate = useMemo(() => formatDate(response.submittedAt), [response.submittedAt]);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Submitted: {formattedDate}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((question: IQuestion) => {
          const answerValues = getAnswerForQuestion(response, question.id);
          if (answerValues.length === 0) return null;

          return (
            <div key={question.id} className="space-y-1">
              <p className="text-sm font-medium">{question.text}</p>
              <div className="text-sm text-muted-foreground">
                {answerValues.length === 1 ? (
                  answerValues[0]
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {answerValues.map((val: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
});

ResponseCard.displayName = 'ResponseCard';

