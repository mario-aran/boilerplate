import { HTTP_STATUS_CODES } from '@/constants/http-status-codes';
import { OPENAPI_PATHS } from '@/lib/zod-to-openapi/constants/openapi-paths';
import {
  createMessageResponse,
  invalidInputsResponse,
} from '@/lib/zod-to-openapi/utils/responses';
import {
  getAllUserRolesSchema,
  updateUserRoleSchema,
  userRoleIdSchema,
  userRoleResponseSchema,
  userRolesResponseSchema,
} from '@/lib/zod/schemas/user-roles.schema';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const registerUserRolesPaths = (registry: OpenAPIRegistry) => {
  const userRolesTags = ['user roles'];

  registry.registerPath({
    tags: userRolesTags,
    method: 'get',
    path: OPENAPI_PATHS.USER_ROLES,
    summary: 'Get all user roles',
    request: { query: getAllUserRolesSchema },
    responses: {
      [HTTP_STATUS_CODES.OK]: {
        description: 'Array of user role objects',
        content: { 'application/json': { schema: userRolesResponseSchema } },
      },
      [HTTP_STATUS_CODES.UNPROCESSABLE]: invalidInputsResponse,
    },
  });

  registry.registerPath({
    tags: userRolesTags,
    method: 'get',
    path: OPENAPI_PATHS.USER_ROLES_ID,
    summary: 'Get user role',
    request: { params: userRoleIdSchema },
    responses: {
      [HTTP_STATUS_CODES.OK]: {
        description: 'User role object',
        content: { 'application/json': { schema: userRoleResponseSchema } },
      },
      [HTTP_STATUS_CODES.UNPROCESSABLE]: invalidInputsResponse,
      [HTTP_STATUS_CODES.NOT_FOUND]: createMessageResponse(),
    },
  });

  registry.registerPath({
    tags: userRolesTags,
    method: 'put',
    path: OPENAPI_PATHS.USER_ROLES_ID,
    summary: 'Update user role',
    request: {
      params: userRoleIdSchema,
      body: {
        content: { 'application/json': { schema: updateUserRoleSchema } },
      },
    },
    responses: {
      [HTTP_STATUS_CODES.OK]: createMessageResponse(),
      [HTTP_STATUS_CODES.UNPROCESSABLE]: invalidInputsResponse,
      [HTTP_STATUS_CODES.NOT_FOUND]: createMessageResponse(),
    },
  });
};
