import { HTTP_STATUS } from '@/constants/http-status';
import { z } from '@/lib/zod';
import { OPENAPI_PATHS } from '@/lib/zod-to-openapi/constants/openapi-paths';
import { loginAuthSchema } from '@/lib/zod/schemas/v1/auth.schema';
import {
  getAllPermissionsSchema,
  permissionsResponseSchema,
} from '@/lib/zod/schemas/v1/permissions.schema';
import {
  getAllUserRolesSchema,
  updateUserRoleSchema,
  userRoleIdSchema,
  userRoleResponseSchema,
  userRolesResponseSchema,
} from '@/lib/zod/schemas/v1/user-roles.schema';
import {
  getAllUsersSchema,
  userIdSchema,
  usersResponseSchema,
} from '@/lib/zod/schemas/v1/users.schema';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const registryV1 = new OpenAPIRegistry();

// Responses
const invalidInputsResponse = {
  description: 'Object with validation error details',
  content: {
    'application/json': {
      schema: z.object({
        message: z.string(),
        validationErrors: z
          .object({ field: z.string(), message: z.string() })
          .array(),
      }),
    },
  },
};

const createMessageResponse = (description = 'Object with message') => ({
  description,
  content: {
    'application/json': { schema: z.object({ message: z.string() }) },
  },
});

// Tags
const authTags = ['auth'];
const permissionsTags = ['permissions'];
const userRolesTags = ['user roles'];
const usersTags = ['users'];

// Registry definitions
registryV1.registerPath({
  tags: authTags,
  method: 'post',
  path: OPENAPI_PATHS.AUTH_LOGIN,
  summary: 'Login user',
  request: {
    body: { content: { 'application/json': { schema: loginAuthSchema } } },
  },
  responses: {
    [HTTP_STATUS.OK]: createMessageResponse(
      'Set jwt cookie and returns a message object',
    ),
    [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
    [HTTP_STATUS.UNAUTHORIZED]: createMessageResponse(),
  },
});
registryV1.registerPath({
  tags: authTags,
  method: 'post',
  path: OPENAPI_PATHS.AUTH_LOGOUT,
  summary: 'Logout user',
  request: undefined,
  responses: {
    [HTTP_STATUS.OK]: createMessageResponse(
      'Clear jwt cookie and returns a message object',
    ),
  },
});

registryV1.registerPath({
  tags: permissionsTags,
  method: 'get',
  path: OPENAPI_PATHS.PERMISSIONS,
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

registryV1.registerPath({
  tags: userRolesTags,
  method: 'get',
  path: OPENAPI_PATHS.USER_ROLES,
  summary: 'Get all user roles',
  request: { query: getAllUserRolesSchema },
  responses: {
    [HTTP_STATUS.OK]: {
      description: 'Array of user role objects',
      content: { 'application/json': { schema: userRolesResponseSchema } },
    },
    [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
  },
});
registryV1.registerPath({
  tags: userRolesTags,
  method: 'get',
  path: OPENAPI_PATHS.USER_ROLES_ID,
  summary: 'Get user role',
  request: { params: userRoleIdSchema },
  responses: {
    [HTTP_STATUS.OK]: {
      description: 'User role object',
      content: { 'application/json': { schema: userRoleResponseSchema } },
    },
    [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
    [HTTP_STATUS.NOT_FOUND]: createMessageResponse(),
  },
});
registryV1.registerPath({
  tags: userRolesTags,
  method: 'put',
  path: OPENAPI_PATHS.USER_ROLES_ID,
  summary: 'Update user role',
  request: {
    params: userRoleIdSchema,
    body: { content: { 'application/json': { schema: updateUserRoleSchema } } },
  },
  responses: {
    [HTTP_STATUS.OK]: createMessageResponse(),
    [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
    [HTTP_STATUS.NOT_FOUND]: createMessageResponse(),
  },
});

registryV1.registerPath({
  tags: usersTags,
  method: 'get',
  path: OPENAPI_PATHS.USERS,
  summary: 'Get all users',
  request: { query: getAllUsersSchema },
  responses: {
    [HTTP_STATUS.OK]: {
      description: 'Array of user objects',
      content: { 'application/json': { schema: usersResponseSchema } },
    },
    [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
  },
});
registryV1.registerPath({
  tags: usersTags,
  method: 'get',
  path: OPENAPI_PATHS.USERS_ID,
  summary: 'Get user',
  request: { params: userIdSchema },
  responses: {
    [HTTP_STATUS.OK]: {
      description: 'User object',
      content: { 'application/json': { schema: usersResponseSchema } },
    },
    [HTTP_STATUS.NOT_FOUND]: createMessageResponse(),
  },
});
