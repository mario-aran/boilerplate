import { HTTP_STATUS } from '@/constants/http-status';
import { OPENAPI_PATHS } from '@/lib/zod-to-openapi/constants/openapi-paths';
import { RegisterPathsProps } from '@/lib/zod-to-openapi/types';
import { invalidInputsResponse } from '@/lib/zod-to-openapi/utils/responses';
import {
  getAllPermissionsSchema,
  permissionsResponseSchema,
} from '@/lib/zod/schemas/permissions.schema';

export const registerPermissionsPaths = ({
  registry,
  security,
}: RegisterPathsProps) => {
  const permissionsTags = ['permissions'];

  registry.registerPath({
    tags: permissionsTags,
    method: 'get',
    path: OPENAPI_PATHS.PERMISSIONS,
    security,
    summary: 'Get all permissions',
    request: { query: getAllPermissionsSchema },
    responses: {
      [HTTP_STATUS.OK]: {
        description: 'Array of permission objects',
        content: { 'application/json': { schema: permissionsResponseSchema } },
      },
      [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
    },
  });
};
