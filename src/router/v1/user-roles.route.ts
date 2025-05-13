import { PERMISSIONS } from '@/constants/permissions';
import { ROUTE_SEGMENTS } from '@/constants/routes';
import { userRolesController } from '@/features/user-roles/user-roles.controller';
import {
  ReadAllUserRolesZod,
  UpdateUserRoleZod,
} from '@/lib/zod/schemas/v1/user-roles.zod';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

export const userRolesRoute = Router();

// Route definitions
userRolesRoute.get(
  '/',
  authenticateWithPermission(PERMISSIONS.READ_USER_ROLES),
  validateWithZod({ query: ReadAllUserRolesZod }),
  routeCatchAsync(userRolesController.readAll),
);

userRolesRoute.get(
  ROUTE_SEGMENTS.ID,
  authenticateWithPermission(PERMISSIONS.READ_USER_ROLE),
  routeCatchAsync(userRolesController.read),
);

userRolesRoute.put(
  ROUTE_SEGMENTS.ID,
  authenticateWithPermission(PERMISSIONS.UPDATE_USER_ROLE),
  validateWithZod({ body: UpdateUserRoleZod }),
  routeCatchAsync(userRolesController.update),
);
