import { IResolvers } from '@graphql-tools/utils';
import { store } from './store';
import { QuestionInput, AnswerInput } from './types';

export const resolvers: IResolvers = {
  Query: {
    forms: () => store.forms.getAll(),
    form: (_: unknown, { id }: { id: string }) => store.forms.getById(id),
    responses: (_: unknown, { formId }: { formId: string }) => 
      store.responses.getByFormId(formId),
  },
  Mutation: {
    createForm: (
      _: unknown,
      { title, description, questions }: { title: string; description?: string; questions: QuestionInput[] }
    ) => store.forms.create(title, description || null, questions),
    deleteForm: (
      _: unknown,
      { id }: { id: string }
    ) => store.forms.delete(id),
    submitResponse: (
      _: unknown,
      { formId, answers }: { formId: string; answers: AnswerInput[] }
    ) => store.responses.create(formId, answers),
  },
};


