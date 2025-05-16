import { HTTP_STATUS } from '@/constants/http-status';
import { OPENAPI_PATHS } from '@/constants/routes';
import { z } from '@/lib/zod';
import { registryV1 } from '@/lib/zod/openapi/registries';
import { email, password } from '@/lib/zod/utils/fields';
import {
  getMessageResponse,
  invalidInputsResponse,
} from '@/lib/zod/utils/openapi-responses';

// Types
export type LoginAuth = z.infer<typeof loginAuthSchema>;

// Schemas
export const loginAuthSchema = z.object({ email, password });

// OpenAPI registries
const tags = ['auth'];

registryV1.registerPath({
  tags,
  method: 'post',
  path: OPENAPI_PATHS.AUTH_LOGIN,
  summary: 'Login user',
  responses: {
    [HTTP_STATUS.OK]: getMessageResponse(
      'Set jwt cookie and returns a message object',
    ),
    [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
    [HTTP_STATUS.UNAUTHORIZED]: getMessageResponse(),
  },
});

registryV1.registerPath({
  tags,
  method: 'post',
  path: OPENAPI_PATHS.AUTH_LOGOUT,
  summary: 'Logout user',
  responses: {
    [HTTP_STATUS.OK]: getMessageResponse(
      'Clear jwt cookie and returns a message object',
    ),
  },
});
