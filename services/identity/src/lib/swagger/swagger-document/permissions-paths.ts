import { SWAGGER_PATHS } from '@/constants/paths';
import { PERMISSIONS_EXAMPLE_COLUMNS } from '@/lib/drizzle/schemas';
import { SECURITY } from '@/lib/swagger/constants';
import { paginatedQueryParams } from '@/lib/swagger/utils/inputs';
import {
  getPaginatedResponse,
  messageResponse,
  unprocessableEntityResponse,
} from '@/lib/swagger/utils/responses';
import { StatusCodes } from 'http-status-codes';

// Values
const tags = ['permissions'];

export const permissionsPaths = {
  [SWAGGER_PATHS.PERMISSIONS]: {
    get: {
      tags,
      security: SECURITY,
      parameters: paginatedQueryParams,
      responses: {
        [StatusCodes.OK]: getPaginatedResponse(PERMISSIONS_EXAMPLE_COLUMNS),
        [StatusCodes.UNAUTHORIZED]: messageResponse,
        [StatusCodes.UNPROCESSABLE_ENTITY]: unprocessableEntityResponse,
      },
    },
  },
};
