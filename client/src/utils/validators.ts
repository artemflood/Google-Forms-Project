export const isValidFormId = (id: string | undefined): id is string => {
  return typeof id === 'string' && id.trim().length > 0;
};

