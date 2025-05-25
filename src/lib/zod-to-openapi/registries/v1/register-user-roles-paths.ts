import { HTTP_STATUS } from '@/constants/http-status';
import { OPENAPI_PATHS } from '@/lib/zod-to-openapi/constants/openapi-paths';
import { RegisterPathsProps } from '@/lib/zod-to-openapi/types';
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

export const registerUserRolesPaths = ({
  registry,
  security,
}: RegisterPathsProps) => {
  const userRolesTags = ['user roles'];

  registry.registerPath({
    tags: userRolesTags,
    method: 'get',
    path: OPENAPI_PATHS.USER_ROLES,
    security,
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

  registry.registerPath({
    tags: userRolesTags,
    method: 'get',
    path: OPENAPI_PATHS.USER_ROLES_ID,
    security,
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

  registry.registerPath({
    tags: userRolesTags,
    method: 'put',
    path: OPENAPI_PATHS.USER_ROLES_ID,
    security,
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
