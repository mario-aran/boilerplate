import { DOC_PATHS } from '@/constants/routes';
import { RESPONSES, SECURITY } from '@/lib/swagger/constants';
import { StatusCodes } from 'http-status-codes';

// Values
const tags = ['permissions'];

export const permissionsPaths = {
  [DOC_PATHS.PERMISSIONS]: {
    get: {
      tags,
      security: SECURITY,
      parameters: [
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', example: 1 },
        },
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', example: 1 },
        },
        {
          in: 'query',
          name: 'sort',
          schema: { type: 'array', items: { type: 'string', example: '-id' } },
          explode: true,
        },
        {
          in: 'query',
          name: 'search',
          schema: { type: 'string', example: 'user' },
        },
      ],
      responses: {
        [StatusCodes.OK]: {
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
                      example: {},
                    },
                  },
                },
              },
            },
          },
        },
        [StatusCodes.UNPROCESSABLE_ENTITY]: RESPONSES.UNPROCESSABLE_ENTITY,
        [StatusCodes.UNAUTHORIZED]: RESPONSES.UNAUTHORIZED,
      },
    },
  },
};
