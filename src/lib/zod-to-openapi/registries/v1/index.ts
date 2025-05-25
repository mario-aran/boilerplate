import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { registerAuthPaths } from './register-auth-paths';
import { registerPermissionsPaths } from './register-permissions-paths';
import { registerUserRolesPaths } from './register-user-roles-paths';
import { registerUsersPaths } from './register-users-paths';

// Registry
export const registryV1 = new OpenAPIRegistry();

// Security
const bearerAuth = registryV1.registerComponent(
  'securitySchemes',
  'bearerAuth',
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  },
);
const security = [{ [bearerAuth.name]: [] }];

// Registry definitions
registerAuthPaths({ registry: registryV1, security });
registerPermissionsPaths({ registry: registryV1, security });
registerUserRolesPaths({ registry: registryV1, security });
registerUsersPaths({ registry: registryV1, security });
