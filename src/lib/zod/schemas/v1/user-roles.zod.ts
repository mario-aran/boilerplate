import { HTTP_STATUS } from '@/constants/http-status';
import { z } from '@/lib/zod';
import { registryV1 } from '@/lib/zod/openapi/registries';
import {
  limit,
  page,
  permissionIds,
  sortUserRoles as sort,
} from '@/lib/zod/utils/fields';

// Types
export type ReadAllUserRolesZod = z.infer<typeof ReadAllUserRolesZod>;
export type UpdateUserRoleZod = z.infer<typeof UpdateUserRoleZod>;

// Schemas
export const ReadAllUserRolesZod = z.object({ sort, limit, page }).partial();
export const UpdateUserRoleZod = z.object({ permissionIds }).partial();

// OpenAPI registries
registryV1.registerPath({
  tags: ['user roles'],
  method: 'get',
  path: '/user-roles',
  summary: 'Get all user roles',
  request: { query: ReadAllUserRolesZod },
  responses: {
    [HTTP_STATUS.OK]: {
      description: 'Array of user role objects',
      content: {
        'application/json': {
          schema: {},
        },
      },
    },
  },
});
