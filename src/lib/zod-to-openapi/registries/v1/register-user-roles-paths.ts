import { HTTP_STATUS } from '@/constants/http-status';
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

export const registerUserRolesPaths = (registryV1: OpenAPIRegistry) => {
  const userRolesTags = ['user roles'];

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
      body: {
        content: { 'application/json': { schema: updateUserRoleSchema } },
      },
    },
    responses: {
      [HTTP_STATUS.OK]: createMessageResponse(),
      [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
      [HTTP_STATUS.NOT_FOUND]: createMessageResponse(),
    },
  });
};
