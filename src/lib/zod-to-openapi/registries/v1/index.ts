import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { registerAuthPaths } from './register-auth-paths';
import { registerPermissionsPaths } from './register-permissions-paths';
import { registerUserRolesPaths } from './register-user-roles-paths';
import { registerUsersPaths } from './register-users-paths';

export const registryV1 = new OpenAPIRegistry();

// Register definitions
registerAuthPaths(registryV1);
registerPermissionsPaths(registryV1);
registerUserRolesPaths(registryV1);
registerUsersPaths(registryV1);
