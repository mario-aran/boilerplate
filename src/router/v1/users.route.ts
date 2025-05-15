import { PERMISSIONS } from '@/constants/permissions';
import { ROUTE_SEGMENTS } from '@/constants/routes';
import { usersController } from '@/features/users/users.controller';
import {
  createUserSchema,
  getAllUsersSchema,
  updateUserPasswordSchema,
  updateUserSchema,
} from '@/lib/zod/schemas/v1';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Router } from 'express';

export const usersRoute = Router();

// Route definitions
usersRoute.get(
  '/',
  authenticateWithPermission(PERMISSIONS.READ_USERS),
  validateWithZod({ query: getAllUsersSchema }),
  controllerCatchAsync(usersController.getAll),
);

usersRoute.get(
  ROUTE_SEGMENTS.ID,
  authenticateWithPermission(PERMISSIONS.READ_USER),
  controllerCatchAsync(usersController.get),
);

usersRoute.post(
  '/',
  validateWithZod({ body: createUserSchema }),
  controllerCatchAsync(usersController.create),
);

usersRoute.patch(
  ROUTE_SEGMENTS.ID,
  authenticateWithPermission(PERMISSIONS.UPDATE_USER),
  validateWithZod({ body: updateUserSchema }),
  controllerCatchAsync(usersController.update),
);

usersRoute.patch(
  ROUTE_SEGMENTS.ID_PASSWORD,
  authenticateWithPermission(PERMISSIONS.UPDATE_USER_PASSWORD),
  validateWithZod({ body: updateUserPasswordSchema }),
  controllerCatchAsync(usersController.updatePassword),
);
