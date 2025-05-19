import { HTTP_STATUS_CODES } from '@/constants/http-status-codes';
import { OPENAPI_PATHS } from '@/lib/zod-to-openapi/constants/openapi-paths';
import {
  createMessageResponse,
  invalidInputsResponse,
} from '@/lib/zod-to-openapi/utils/responses';
import { loginAuthSchema } from '@/lib/zod/schemas/auth.schema';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const registerAuthPaths = (registry: OpenAPIRegistry) => {
  const authTags = ['auth'];

  registry.registerPath({
    tags: authTags,
    method: 'post',
    path: OPENAPI_PATHS.AUTH_LOGIN,
    summary: 'Login user',
    request: {
      body: { content: { 'application/json': { schema: loginAuthSchema } } },
    },
    responses: {
      [HTTP_STATUS_CODES.OK]: createMessageResponse(
        'Set jwt cookie and returns a message object',
      ),
      [HTTP_STATUS_CODES.UNPROCESSABLE_CONTENT]: invalidInputsResponse,
      [HTTP_STATUS_CODES.UNAUTHORIZED]: createMessageResponse(),
    },
  });

  registry.registerPath({
    tags: authTags,
    method: 'post',
    path: OPENAPI_PATHS.AUTH_LOGOUT,
    summary: 'Logout user',
    request: undefined,
    responses: {
      [HTTP_STATUS_CODES.OK]: createMessageResponse(
        'Clear jwt cookie and returns a message object',
      ),
    },
  });
};
