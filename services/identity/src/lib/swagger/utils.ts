export const generateUnprocessableResponse = () => ({
  description: 'Object with message and validation errors',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Invalid inputs' },
          validationErrors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', example: 'id' },
                message: { type: 'string', example: 'Invalid id format' },
              },
            },
          },
        },
      },
    },
  },
});

export const generateMessageResponse = (example: string) => ({
  description: 'Object with message',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: { message: { type: 'string', example } },
      },
    },
  },
});
