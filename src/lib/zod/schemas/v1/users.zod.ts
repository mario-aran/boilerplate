import { HTTP_STATUS } from '@/constants/http-status';
import { z } from '@/lib/zod';
import { registryV1 } from '@/lib/zod/openapi/registries';
import {
  email,
  firstName,
  lastName,
  limit,
  page,
  password,
  search,
  sortUsers as sort,
  userRoleId,
} from '@/lib/zod/utils/fields';

// Types
export type ReadAllUsersZod = z.infer<typeof ReadAllUsersZod>;
export type CreateUserZod = z.infer<typeof CreateUserZod>;
export type UpdateUserZod = z.infer<typeof UpdateUserZod>;
export type UpdateUserPasswordZod = z.infer<typeof UpdateUserPasswordZod>;

// Schemas
export const ReadAllUsersZod = z
  .object({ sort, limit, page, search, userRoleId })
  .partial();

export const CreateUserZod = z.object({ email, password, firstName, lastName });

export const UpdateUserZod = z
  .object({ email, firstName, lastName, userRoleId })
  .partial();

export const UpdateUserPasswordZod = z.object({ password });

// OpenAPI registries
const tags = ['users'];

registryV1.registerPath({
  tags,
  method: 'get',
  path: '/api/v1/users',
  summary: 'Get users',
  request: { query: ReadAllUsersZod },
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
  path: '/api/v1/users/{id}',
  summary: 'Get user',
  responses: {
    [HTTP_STATUS.OK]: {
      description: '',
      content: { 'application/json': { schema: {} } },
    },
  },
});

registryV1.registerPath({
  tags,
  method: 'post',
  path: '/api/v1/users',
  summary: 'Create user',
  responses: {
    [HTTP_STATUS.CREATED]: {
      description: '',
      content: { 'application/json': { schema: {} } },
    },
  },
});

registryV1.registerPath({
  tags,
  method: 'patch',
  path: '/api/v1/users/{id}',
  summary: 'Update user',
  responses: {
    [HTTP_STATUS.OK]: {
      description: '',
      content: { 'application/json': { schema: {} } },
    },
  },
});

registryV1.registerPath({
  tags,
  method: 'patch',
  path: '/api/v1/users/{id}/password',
  summary: 'Update user password',
  responses: {
    [HTTP_STATUS.OK]: {
      description: '',
      content: { 'application/json': { schema: {} } },
    },
  },
});
