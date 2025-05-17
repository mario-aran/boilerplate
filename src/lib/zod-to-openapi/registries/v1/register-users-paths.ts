import { HTTP_STATUS } from '@/constants/http-status';
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
} from '@/lib/zod/schemas/v1/users.schema';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const registerUsersPaths = (registryV1: OpenAPIRegistry) => {
  const usersTags = ['users'];

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

  registryV1.registerPath({
    tags: usersTags,
    method: 'post',
    path: OPENAPI_PATHS.USERS,
    summary: 'Create user',
    request: {
      body: { content: { 'application/json': { schema: createUserSchema } } },
    },
    responses: {
      [HTTP_STATUS.CREATED]: createMessageResponse(),
      [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
    },
  });

  registryV1.registerPath({
    tags: usersTags,
    method: 'patch',
    path: OPENAPI_PATHS.USERS_ID,
    summary: 'Update user',
    request: {
      params: userIdSchema,
      body: { content: { 'application/json': { schema: updateUserSchema } } },
    },
    responses: {
      [HTTP_STATUS.OK]: createMessageResponse(),
      [HTTP_STATUS.NOT_FOUND]: createMessageResponse(),
      [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
    },
  });

  registryV1.registerPath({
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
      [HTTP_STATUS.OK]: createMessageResponse(),
      [HTTP_STATUS.NOT_FOUND]: createMessageResponse(),
      [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
    },
  });
};
