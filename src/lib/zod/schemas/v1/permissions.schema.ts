import { HTTP_STATUS } from '@/constants/http-status';
import { OPENAPI_PATHS } from '@/constants/routes';
import { z } from '@/lib/zod';
import { registryV1 } from '@/lib/zod/openapi/registries';
import { limit, page } from '@/lib/zod/utils/base-fields';
import { sortPermissions as sort } from '@/lib/zod/utils/derived-fields';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Schemas
export const getAllPermissionsSchema = z
  .object({ sort, limit, page })
  .partial();

// OpenAPI registries
const tags = ['permissions'];

registryV1.registerPath({
  tags,
  method: 'get',
  path: OPENAPI_PATHS.PERMISSIONS,
  summary: 'Get permissions',
  request: { query: getAllPermissionsSchema },
  responses: {
    [HTTP_STATUS.OK]: {
      description: '',
      content: { 'application/json': { schema: {} } },
    },
  },
});
