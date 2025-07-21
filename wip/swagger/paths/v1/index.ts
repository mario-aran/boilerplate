import { authPaths } from './auth-paths';
import { permissionsPaths } from './permissions-paths';
import { userRolesPaths } from './user-roles-paths';
import { usersPaths } from './users-paths';

export const pathsV1 = {
  ...authPaths,
  ...permissionsPaths,
  ...userRolesPaths,
  ...usersPaths,
};
