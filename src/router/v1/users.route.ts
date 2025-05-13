import { PERMISSIONS } from '@/constants/permissions';
import { ROUTE_SEGMENTS } from '@/constants/routes';
import { usersController } from '@/features/users/users.controller';
import {
  CreateUserZod,
  ReadAllUsersZod,
  UpdateUserPasswordZod,
  UpdateUserZod,
} from '@/lib/zod/schemas/v1/users.zod';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

export const usersRoute = Router();

// Route definitions
usersRoute.post(
  '/',
  validateWithZod({ body: CreateUserZod }),
  routeCatchAsync(usersController.create),
);

usersRoute.get(
  '/',
  authenticateWithPermission(PERMISSIONS.READ_USERS),
  validateWithZod({ query: ReadAllUsersZod }),
  routeCatchAsync(usersController.readAll),
);

usersRoute.get(
  ROUTE_SEGMENTS.ID,
  authenticateWithPermission(PERMISSIONS.READ_USER),
  routeCatchAsync(usersController.read),
);

usersRoute.patch(
  ROUTE_SEGMENTS.ID,
  authenticateWithPermission(PERMISSIONS.UPDATE_USER),
  validateWithZod({ body: UpdateUserZod }),
  routeCatchAsync(usersController.update),
);

usersRoute.patch(
  ROUTE_SEGMENTS.ID_PASSWORD,
  authenticateWithPermission(PERMISSIONS.UPDATE_USER_PASSWORD),
  validateWithZod({ body: UpdateUserPasswordZod }),
  routeCatchAsync(usersController.updatePassword),
);
