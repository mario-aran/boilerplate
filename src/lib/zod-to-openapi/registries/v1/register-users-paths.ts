import { HTTP_STATUS_CODES } from '@/constants/http-status-codes';
import { OPENAPI_PATHS } from '@/lib/zod-to-openapi/constants/openapi-paths';
import {
  createMessageResponse,
  invalidInputsResponse,
} from '@/lib/zod-to-openapi/utils/responses';
import {
  createUserSchema,
  getAllUsersSchema,
  updateUserPasswordSchema,
  updateUserSchema,
  userIdSchema,
  usersResponseSchema,
} from '@/lib/zod/schemas/users.schema';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const registerUsersPaths = (registry: OpenAPIRegistry) => {
  const usersTags = ['users'];

  registry.registerPath({
    tags: usersTags,
    method: 'get',
    path: OPENAPI_PATHS.USERS,
    summary: 'Get all users',
    request: { query: getAllUsersSchema },
    responses: {
      [HTTP_STATUS_CODES.OK]: {
        description: 'Array of user objects',
        content: { 'application/json': { schema: usersResponseSchema } },
      },
      [HTTP_STATUS_CODES.UNPROCESSABLE_CONTENT]: invalidInputsResponse,
    },
  });

  registry.registerPath({
    tags: usersTags,
    method: 'get',
    path: OPENAPI_PATHS.USERS_ID,
    summary: 'Get user',
    request: { params: userIdSchema },
    responses: {
      [HTTP_STATUS_CODES.OK]: {
        description: 'User object',
        content: { 'application/json': { schema: usersResponseSchema } },
      },
      [HTTP_STATUS_CODES.NOT_FOUND]: createMessageResponse(),
    },
  });

  registry.registerPath({
    tags: usersTags,
    method: 'post',
    path: OPENAPI_PATHS.USERS,
    summary: 'Create user',
    request: {
      body: { content: { 'application/json': { schema: createUserSchema } } },
    },
    responses: {
      [HTTP_STATUS_CODES.CREATED]: createMessageResponse(),
      [HTTP_STATUS_CODES.UNPROCESSABLE_CONTENT]: invalidInputsResponse,
    },
  });

  registry.registerPath({
    tags: usersTags,
    method: 'patch',
    path: OPENAPI_PATHS.USERS_ID,
    summary: 'Update user',
    request: {
      params: userIdSchema,
      body: { content: { 'application/json': { schema: updateUserSchema } } },
    },
    responses: {
      [HTTP_STATUS_CODES.OK]: createMessageResponse(),
      [HTTP_STATUS_CODES.NOT_FOUND]: createMessageResponse(),
      [HTTP_STATUS_CODES.UNPROCESSABLE_CONTENT]: invalidInputsResponse,
    },
  });

  registry.registerPath({
    tags: usersTags,
    method: 'patch',
    path: OPENAPI_PATHS.USERS_ID_PASSWORD,
    summary: 'Update user password',
    request: {
      params: userIdSchema,
      body: {
        content: { 'application/json': { schema: updateUserPasswordSchema } },
      },
    },
    responses: {
      [HTTP_STATUS_CODES.OK]: createMessageResponse(),
      [HTTP_STATUS_CODES.NOT_FOUND]: createMessageResponse(),
      [HTTP_STATUS_CODES.UNPROCESSABLE_CONTENT]: invalidInputsResponse,
    },
  });
};
