import { HTTP_STATUS } from '@/constants/http-status';
import { OPENAPI_PATHS } from '@/constants/routes';
import { z } from '@/lib/zod';
import { registryV1 } from '@/lib/zod/openapi/registries';
import {
  invalidInputsResponse,
  messageResponse,
} from '@/lib/zod/utils/openapi-responses';
import {
  dateTime,
  email,
  firstName,
  lastName,
  limit,
  page,
  password,
  search,
  userRoleId,
  uuid,
} from '@/lib/zod/utils/zod-fields';
import { sortUsers as sort } from '@/lib/zod/utils/zod-generated-fields';
import { idSchema } from '@/lib/zod/utils/zod-schemas';

// Types
export type GetAllUsers = z.infer<typeof getAllUsersSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateUserPassword = z.infer<typeof updateUserPasswordSchema>;

// Schemas
export const getAllUsersSchema = z
  .object({ sort, limit, page, search, userRoleId })
  .partial();

export const createUserSchema = z.object({
  email,
  password,
  firstName,
  lastName,
});

export const updateUserSchema = z
  .object({ email, firstName, lastName, userRoleId })
  .partial();

export const updateUserPasswordSchema = z.object({ password });

// OpenAPI registries
const getUserResponseSchema = z.object({
  id: uuid,
  userRoleId,
  createdAt: dateTime,
  updatedAt: dateTime,
  email,
  firstName,
  lastName,
});

const getAllUsersResponseSchema = getUserResponseSchema.array();
const tags = ['users'];

registryV1.registerPath({
  tags,
  method: 'get',
  path: OPENAPI_PATHS.USERS,
  summary: 'Get all users',
  request: { query: getAllUsersSchema },
  responses: {
    [HTTP_STATUS.OK]: {
      description: 'Array of user objects',
      content: { 'application/json': { schema: getAllUsersResponseSchema } },
    },
    [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
  },
});

registryV1.registerPath({
  tags,
  method: 'get',
  path: OPENAPI_PATHS.USERS_ID,
  summary: 'Get user',
  request: { params: idSchema },
  responses: {
    [HTTP_STATUS.OK]: {
      description: 'User object',
      content: { 'application/json': { schema: getUserResponseSchema } },
    },
    [HTTP_STATUS.NOT_FOUND]: messageResponse,
  },
});

registryV1.registerPath({
  tags,
  method: 'post',
  path: OPENAPI_PATHS.USERS,
  summary: 'Create user',
  request: {
    body: { content: { 'application/json': { schema: createUserSchema } } },
  },
  responses: {
    [HTTP_STATUS.CREATED]: messageResponse,
    [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
  },
});

registryV1.registerPath({
  tags,
  method: 'patch',
  path: OPENAPI_PATHS.USERS_ID,
  summary: 'Update user',
  request: {
    params: idSchema,
    body: { content: { 'application/json': { schema: updateUserSchema } } },
  },
  responses: {
    [HTTP_STATUS.OK]: messageResponse,
    [HTTP_STATUS.NOT_FOUND]: messageResponse,
    [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
  },
});

registryV1.registerPath({
  tags,
  method: 'patch',
  path: OPENAPI_PATHS.USERS_ID_PASSWORD,
  summary: 'Update user password',
  request: {
    params: idSchema,
    body: {
      content: { 'application/json': { schema: updateUserPasswordSchema } },
    },
  },
  responses: {
    [HTTP_STATUS.OK]: messageResponse,
    [HTTP_STATUS.NOT_FOUND]: messageResponse,
    [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
  },
});
