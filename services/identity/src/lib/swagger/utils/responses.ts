export const messageResponse = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};

export const unprocessableEntityResponse = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          validationErrors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string' },
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
};

export const getPaginatedResponse = (dataExample: Record<string, string>) => ({
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          total: { type: 'number', example: 50 },
          limit: { type: 'number', example: 10 },
          page: { type: 'number', example: 1 },
          prevPage: { type: 'number', nullable: true, example: null },
          nextPage: { type: 'number', nullable: true, example: 2 },
          totalPages: { type: 'number', example: 5 },
          data: {
            type: 'array',
            items: {
              type: 'object',
              example: dataExample,
            },
          },
        },
      },
    },
  },
});
