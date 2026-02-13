import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IForm } from '../types';
import { Button } from './ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Trash2 } from 'lucide-react';
import { ROUTES } from '../constants/routes';

interface IFormCardProps {
  form: IForm;
  onDelete: (form: IForm) => void;
  isDeleting: boolean;
}

export const FormCard = memo(({ form, onDelete, isDeleting }: IFormCardProps) => {
  const handleDeleteClick = useCallback(() => {
    onDelete(form);
  }, [form, onDelete]);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle>{form.title}</CardTitle>
            {form.description && <CardDescription>{form.description}</CardDescription>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" asChild className="flex-1" aria-label={`View form ${form.title}`}>
          <Link to={ROUTES.FILL_FORM(form.id)}>View Form</Link>
        </Button>
        <Button variant="outline" size="sm" asChild className="flex-1" aria-label={`View responses for ${form.title}`}>
          <Link to={ROUTES.FORM_RESPONSES(form.id)}>View Responses</Link>
        </Button>
      </CardFooter>
    </Card>
  );
});

FormCard.displayName = 'FormCard';

