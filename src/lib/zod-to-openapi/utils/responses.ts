import { z } from '@/lib/zod';

export const invalidInputsResponse = {
  description: 'Object with validation error details',
  content: {
    'application/json': {
      schema: z.strictObject({
        message: z.string().openapi({ example: 'Invalid inputs' }),
        validationErrors: z
          .strictObject({
            field: z.string().openapi({ example: 'id' }),
            message: z.string().openapi({ example: 'Invalid id format' }),
          })
          .array(),
      }),
    },
  },
};

export const createMessageResponse = (description = 'Object with message') => ({
  description,
  content: {
    'application/json': {
      schema: z.strictObject({
        message: z.string().openapi({ example: 'A message' }),
      }),
    },
  },
});
