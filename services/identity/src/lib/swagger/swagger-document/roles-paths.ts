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

const commonResponses = {
  [StatusCodes.UNAUTHORIZED]: messageResponse,
  [StatusCodes.UNPROCESSABLE_ENTITY]: unprocessableEntityResponse,
};

const idCommonResponses = {
  ...commonResponses,
  [StatusCodes.NOT_FOUND]: messageResponse,
};

export const rolesPaths = {
  [DOC_PATHS.ROLES]: {
    get: {
      tags,
      security: SECURITY,
      parameters: paginatedQueryParams,
      responses: {
        ...commonResponses,
        [StatusCodes.OK]: getPaginatedResponse(ROLES_EXAMPLE_COLUMNS),
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
        ...commonResponses,
        [StatusCodes.OK]: messageResponse,
      },
    },
  },

  [DOC_PATHS.ROLES_ID]: {
    get: {
      tags,
      security: SECURITY,
      parameters: idPathParam,
      responses: {
        ...idCommonResponses,
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
        ...idCommonResponses,
        [StatusCodes.OK]: messageResponse,
      },
    },
    delete: {
      tags,
      security: SECURITY,
      parameters: idPathParam,
      responses: {
        ...idCommonResponses,
        [StatusCodes.OK]: messageResponse,
      },
    },
  },
};
