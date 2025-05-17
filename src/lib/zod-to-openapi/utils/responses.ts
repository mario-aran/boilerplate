import { z } from '@/lib/zod';

export const invalidInputsResponse = {
  description: 'Object with validation error details',
  content: {
    'application/json': {
      schema: z.object({
        message: z.string(),
        validationErrors: z
          .object({ field: z.string(), message: z.string() })
          .array(),
      }),
    },
  },
};

export const createMessageResponse = (description = 'Object with message') => ({
  description,
  content: {
    'application/json': { schema: z.object({ message: z.string() }) },
  },
});
