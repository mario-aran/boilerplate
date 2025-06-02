import { HTTP_STATUS } from '@/constants/http-status';
import { RESPONSES, SECURITY } from '@/lib/swagger/constants/components';
import { SWAGGER_PATHS } from '@/lib/swagger/constants/swagger-paths';

const tags = ['permissions'];

export const permissionsPaths = {
  [SWAGGER_PATHS.PERMISSIONS]: {
    get: {
      tags,
      security: SECURITY,
      summary: 'Get all permissions',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          schema: { type: 'integer', example: '10' },
        },
        {
          name: 'page',
          in: 'query',
          schema: { type: 'integer', example: '2' },
        },
        {
          name: 'search',
          in: 'query',
          schema: { type: 'string', example: 'Any text' },
        },
        {
          name: 'sort',
          in: 'query',
          schema: {
            type: 'array',
            items: { type: 'string', example: '-createdAt' },
          },
        },
      ],
      responses: {
        [HTTP_STATUS.OK]: {
          description: 'Array of permission objects',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  total: { type: 'number', example: 1 },
                  limit: { type: 'number', example: 1 },
                  page: { type: 'number', example: 1 },
                  prevPage: { type: 'number', example: null },
                  nextPage: { type: 'number', example: null },
                  totalPages: { type: 'number', example: 1 },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      // properties: { ...final, mega: { type: 'Date' } },
                    },
                  },
                },
              },
            },
          },
        },
        [HTTP_STATUS.UNPROCESSABLE]: RESPONSES.UNPROCESSABLE,
      },
    },
  },
};

//  total: number;
//   limit: number;
//   page: number;
//   prevPage: number | null;
//   nextPage: number | null;
//   totalPages: number;
//   data: {
//       id: string;
//       createdAt: Date;
//       updatedAt: Date;
//   }[];
