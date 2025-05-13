import { HTTP_STATUS } from '@/constants/http-status';
import { z } from '@/lib/zod';
import { registryV1 } from '@/lib/zod/openapi/registries';
import { limit, page, sortPermissions as sort } from '@/lib/zod/utils/fields';

// Types
export type ReadAllPermissionsZod = z.infer<typeof ReadAllPermissionsZod>;

// Schemas
export const ReadAllPermissionsZod = z.object({ sort, limit, page }).partial();

// OpenAPI registries
const tags = ['permissions'];

registryV1.registerPath({
  tags,
  method: 'get',
  path: '/api/v1/permissions',
  summary: 'Get permissions',
  request: { query: ReadAllPermissionsZod },
  responses: {
    [HTTP_STATUS.OK]: {
      description: '',
      content: { 'application/json': { schema: {} } },
    },
  },
});
