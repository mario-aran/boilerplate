import { PERMISSIONS } from '@/constants/permissions';
import { ROUTE_SEGMENTS } from '@/constants/routes';
import { userRolesController } from '@/controllers/v1/user-roles.controller';
import {
  getAllUserRolesSchema,
  updateUserRoleSchema,
  userRoleIdSchema,
} from '@/lib/zod/schemas/v1';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Router } from 'express';

export const userRolesRoute = Router();

// Route definitions
userRolesRoute.get(
  '/',
  authenticateWithPermission(PERMISSIONS.READ_USER_ROLES),
  validateWithZod({ query: getAllUserRolesSchema }),
  controllerCatchAsync(userRolesController.getAll),
);

userRolesRoute.get(
  ROUTE_SEGMENTS.ID,
  authenticateWithPermission(PERMISSIONS.READ_USER_ROLE),
  validateWithZod({ params: userRoleIdSchema }),
  controllerCatchAsync(userRolesController.get),
);

userRolesRoute.put(
  ROUTE_SEGMENTS.ID,
  authenticateWithPermission(PERMISSIONS.UPDATE_USER_ROLE),
  validateWithZod({ params: userRoleIdSchema, body: updateUserRoleSchema }),
  controllerCatchAsync(userRolesController.update),
);
