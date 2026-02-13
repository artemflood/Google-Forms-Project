import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useGetFormsQuery, useDeleteFormMutation } from '../store';
import { IForm } from '../types';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { LoadingState, ErrorState, ConfirmationDialog, FormCard } from '../components';
import { ROUTES } from '../constants/routes';
import { MESSAGES } from '../constants/messages';

export const HomePage = () => {
  const { data, isLoading, error } = useGetFormsQuery(undefined);
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<IForm | null>(null);

  const handleDeleteClick = useCallback((form: IForm) => {
    setFormToDelete(form);
    setDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!formToDelete) return;

    setDeletingId(formToDelete.id);
    try {
      await deleteForm(formToDelete.id).unwrap();
      toast.success(MESSAGES.FORM.DELETED, {
        description: `"${formToDelete.title}" has been deleted.`,
      });
    } catch (err: unknown) {
      toast.error(MESSAGES.FORM.DELETE_FAILED, {
        description: MESSAGES.FORM.DELETE_FAILED_DESCRIPTION,
      });
    } finally {
      setDeletingId(null);
      setFormToDelete(null);
    }
  }, [formToDelete, deleteForm]);

  const forms = useMemo(() => data?.forms || [], [data?.forms]);

  const dialogDescription = useMemo(
    () =>
      formToDelete
        ? MESSAGES.CONFIRMATION.DELETE_DESCRIPTION(formToDelete.title)
        : MESSAGES.CONFIRMATION.DELETE_DEFAULT,
    [formToDelete]
  );

  if (isLoading) {
    return <LoadingState message={MESSAGES.LOADING.FORMS} />;
  }

  if (error) {
    return <ErrorState message={MESSAGES.ERROR.LOAD_FORMS} />;
  }

  return (
    <div className="space-y-6">
      <ConfirmationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleConfirmDelete}
        title={MESSAGES.CONFIRMATION.DELETE_TITLE}
        description={dialogDescription}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Forms</h1>
        <Button asChild>
          <Link to={ROUTES.CREATE_FORM}>+ Create New Form</Link>
        </Button>
      </div>

      {forms.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">{MESSAGES.EMPTY.NO_FORMS}</p>
            <Button asChild>
              <Link to={ROUTES.CREATE_FORM}>Create your first form</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form: IForm) => (
            <FormCard
              key={form.id}
              form={form}
              onDelete={handleDeleteClick}
              isDeleting={isDeleting && deletingId === form.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
