import { Form, Question, Response, Answer, QuestionInput, AnswerInput } from './types';

let forms: Form[] = [];
let responses: Response[] = [];
let formIdCounter = 1;
let questionIdCounter = 1;
let responseIdCounter = 1;

export const store = {
  forms: {
    getAll: (): Form[] => [...forms],
    getById: (id: string): Form | undefined => forms.find(f => f.id === id),
    create: (title: string, description: string | null, questions: QuestionInput[]): Form => {
      const formQuestions: Question[] = questions.map(q => ({
        id: `q${questionIdCounter++}`,
        type: q.type,
        text: q.text,
        required: q.required,
        options: q.options || null,
      }));

      const form: Form = {
        id: `f${formIdCounter++}`,
        title,
        description: description || null,
        questions: formQuestions,
        createdAt: new Date().toISOString(),
      };

      forms.push(form);
      return form;
    },
    delete: (id: string): boolean => {
      const index = forms.findIndex(f => f.id === id);
      if (index === -1) {
        return false;
      }
      forms.splice(index, 1);
      responses = responses.filter(r => r.formId !== id);
      return true;
    },
  },
  responses: {
    getByFormId: (formId: string): Response[] => 
      responses.filter(r => r.formId === formId),
    create: (formId: string, answers: AnswerInput[]): Response => {
      const response: Response = {
        id: `r${responseIdCounter++}`,
        formId,
        answers: answers.map(a => ({ questionId: a.questionId, value: a.value })),
        submittedAt: new Date().toISOString(),
      };
      responses.push(response);
      return response;
    },
  },
};


