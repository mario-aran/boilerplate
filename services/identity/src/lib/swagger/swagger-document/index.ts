import { API_GATEWAY_URL } from '@/config/env';
import { BEARER_AUTH } from '@/lib/swagger/constants';
import { authPaths } from './auth-paths';
import { permissionsPaths } from './permissions-paths';
import { rolesPaths } from './roles-paths';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: { title: 'API Documentation', version: '1.0.0' },
  servers: [{ url: API_GATEWAY_URL }],
  components: {
    securitySchemes: {
      [BEARER_AUTH]: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
  },
  paths: {
    ...authPaths,
    ...rolesPaths,
    ...permissionsPaths,
  },
};
