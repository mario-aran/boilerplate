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
const tags = ['user roles'];

registryV1.registerPath({
  tags,
  method: 'get',
  path: '/api/v1/user-roles',
  summary: 'Get user roles',
  request: { query: ReadAllUserRolesZod },
  responses: {
    [HTTP_STATUS.OK]: {
      description: '',
      content: { 'application/json': { schema: {} } },
    },
  },
});

registryV1.registerPath({
  tags,
  method: 'get',
  path: '/api/v1/user-roles/{id}',
  summary: 'Get user role',
  responses: {
    [HTTP_STATUS.OK]: {
      description: '',
      content: { 'application/json': { schema: {} } },
    },
  },
});

registryV1.registerPath({
  tags,
  method: 'put',
  path: '/api/v1/user-roles/{id}',
  summary: 'Update user role',
  responses: {
    [HTTP_STATUS.OK]: {
      description: '',
      content: { 'application/json': { schema: {} } },
    },
  },
});
