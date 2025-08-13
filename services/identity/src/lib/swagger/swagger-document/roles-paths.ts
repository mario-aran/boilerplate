import { DOC_PATHS } from '@/constants/routes';
import { ROLES_EXAMPLE_COLUMNS } from '@/lib/drizzle/schemas';
import { SECURITY } from '@/lib/swagger/constants';
import { idPathParam, paginatedQueryParams } from '@/lib/swagger/utils/inputs';
import {
  getPaginatedResponse,
  messageResponse,
  unprocessableEntityResponse,
} from '@/lib/swagger/utils/responses';
import { StatusCodes } from 'http-status-codes';

// Values
const tags = ['roles'];

export const rolesPaths = {
  [DOC_PATHS.ROLES]: {
    get: {
      tags,
      security: SECURITY,
      parameters: paginatedQueryParams,
      responses: {
        [StatusCodes.OK]: getPaginatedResponse(ROLES_EXAMPLE_COLUMNS),
        [StatusCodes.UNAUTHORIZED]: messageResponse,
        [StatusCodes.UNPROCESSABLE_ENTITY]: unprocessableEntityResponse,
      },
    },
    post: {
      tags,
      security: SECURITY,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: { id: { type: 'string' } },
              required: ['id'],
            },
          },
        },
      },
      responses: {
        [StatusCodes.OK]: messageResponse,
        [StatusCodes.UNAUTHORIZED]: messageResponse,
        [StatusCodes.UNPROCESSABLE_ENTITY]: unprocessableEntityResponse,
      },
    },
  },

  [DOC_PATHS.ROLES_ID]: {
    get: {
      tags,
      security: SECURITY,
      parameters: idPathParam,
      responses: {
        [StatusCodes.OK]: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: ROLES_EXAMPLE_COLUMNS,
              },
            },
          },
        },
        [StatusCodes.UNAUTHORIZED]: messageResponse,
        [StatusCodes.NOT_FOUND]: messageResponse,
        [StatusCodes.UNPROCESSABLE_ENTITY]: unprocessableEntityResponse,
      },
    },
    patch: {
      tags,
      security: SECURITY,
      parameters: idPathParam,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                permissionIds: { type: 'array', items: { type: 'string' } },
              },
            },
          },
        },
      },
      responses: {
        [StatusCodes.OK]: messageResponse,
        [StatusCodes.UNAUTHORIZED]: messageResponse,
        [StatusCodes.NOT_FOUND]: messageResponse,
        [StatusCodes.UNPROCESSABLE_ENTITY]: unprocessableEntityResponse,
      },
    },
    delete: {
      tags,
      security: SECURITY,
      parameters: idPathParam,
      responses: {
        [StatusCodes.OK]: messageResponse,
        [StatusCodes.UNAUTHORIZED]: messageResponse,
        [StatusCodes.NOT_FOUND]: messageResponse,
        [StatusCodes.UNPROCESSABLE_ENTITY]: unprocessableEntityResponse,
      },
    },
  },
};
