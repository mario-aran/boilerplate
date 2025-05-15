import { z } from '@/lib/zod';

export const messageResponse = {
  description: 'Object with message',
  content: {
    'application/json': {
      schema: z.object({
        message: z.string().openapi({ example: 'Message' }),
      }),
    },
  },
};

export const invalidInputsResponse = {
  description: 'Object with error details',
  content: {
    'application/json': {
      schema: z.object({
        message: z.string().openapi({ example: 'Invalid inputs' }),
        validationErrors: z.array(
          z.object({
            field: z.string().openapi({ example: 'id' }),
            message: z.string().openapi({ example: 'Invalid id format' }),
          }),
        ),
      }),
    },
  },
};
