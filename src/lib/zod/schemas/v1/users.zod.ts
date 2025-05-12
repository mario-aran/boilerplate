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
registryV1.registerPath({
  tags: ['users'],
  method: 'get',
  path: '/users',
  summary: 'Get all users',
  request: { query: ReadAllUsersZod },
  responses: {
    [HTTP_STATUS.OK]: {
      description: 'Array of objects with user data.',
      content: {
        'application/json': {
          schema: {},
        },
      },
    },
  },
});
