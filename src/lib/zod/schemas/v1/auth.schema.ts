import { HTTP_STATUS } from '@/constants/http-status';
import { OPENAPI_PATHS } from '@/constants/routes';
import { z } from '@/lib/zod';
import { registryV1 } from '@/lib/zod/openapi/registries';
import { messageSchema } from '@/lib/zod/utils/base-schemas';
import { email, password } from '@/lib/zod/utils/fields';
import {
  invalidInputsResponse,
  messageResponse,
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
    [HTTP_STATUS.OK]: {
      description: 'Set jwt cookie and returns a message object',
      content: { 'application/json': { schema: messageSchema } },
    },
    [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
    [HTTP_STATUS.UNAUTHORIZED]: messageResponse,
  },
});

registryV1.registerPath({
  tags,
  method: 'post',
  path: OPENAPI_PATHS.AUTH_LOGOUT,
  summary: 'Logout user',
  responses: {
    [HTTP_STATUS.OK]: {
      description: 'Clear jwt cookie and returns a message object',
      content: { 'application/json': { schema: messageSchema } },
    },
  },
});
