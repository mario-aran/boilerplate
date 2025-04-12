import { z } from 'zod';

// Filters
const getSort = (allowedFields: string[]) => {
  return z.string().refine(
    (value) =>
      value.split(',').every((field) => {
        const cleanField = field.startsWith('-') ? field.slice(1) : field;
        return allowedFields.includes(cleanField);
      }),
    { message: 'Invalid sort field(s)' },
  );
};
