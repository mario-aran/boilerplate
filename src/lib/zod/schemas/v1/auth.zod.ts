import { HTTP_STATUS } from '@/constants/http-status';
import { ROUTES_V1 } from '@/constants/routes';
import { z } from '@/lib/zod';
import { registryV1 } from '@/lib/zod/openapi/registries';
import { email, password } from '@/lib/zod/utils/fields';

// Types
export type LoginAuthZod = z.infer<typeof LoginAuthZod>;

// Schemas
export const LoginAuthZod = z.object({ email, password });

// OpenAPI registries
const tags = ['auth'];

registryV1.registerPath({
  tags,
  method: 'post',
  path: ROUTES_V1.AUTH_LOGIN,
  summary: 'Login',
  responses: {
    [HTTP_STATUS.OK]: {
      description: '',
      content: { 'application/json': { schema: {} } },
    },
  },
});

registryV1.registerPath({
  tags,
  method: 'post',
  path: ROUTES_V1.AUTH_LOGOUT,
  summary: 'Logout',
  responses: {
    [HTTP_STATUS.OK]: {
      description: '',
      content: { 'application/json': { schema: {} } },
    },
  },
});
