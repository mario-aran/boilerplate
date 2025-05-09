import { PERMISSIONS } from '@/constants/permissions';
import { ROUTE_PATHS } from '@/constants/routes';
import { usersController } from '@/features/users/users.controller';
import {
  createUserZod,
  readAllUsersZod,
  updateUserPasswordZod,
  updateUserZod,
} from '@/lib/zod/schemas/v1/users.zod';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

// Router
const router = Router();

// Route definitions
router.post(
  '/',
  validateWithZod({ body: createUserZod }),
  routeCatchAsync(usersController.create),
);

router.get(
  '/',
  authenticateWithPermission(PERMISSIONS.READ_USERS),
  validateWithZod({ query: readAllUsersZod }),
  routeCatchAsync(usersController.readAll),
);

router.get(
  ROUTE_PATHS.USERS_ID,
  authenticateWithPermission(PERMISSIONS.READ_USER),
  routeCatchAsync(usersController.read),
);

router.patch(
  ROUTE_PATHS.USERS_ID,
  authenticateWithPermission(PERMISSIONS.UPDATE_USER),
  validateWithZod({ body: updateUserZod }),
  routeCatchAsync(usersController.update),
);

router.patch(
  ROUTE_PATHS.USERS_ID_PASSWORD,
  authenticateWithPermission(PERMISSIONS.UPDATE_USER_PASSWORD),
  validateWithZod({ body: updateUserPasswordZod }),
  routeCatchAsync(usersController.updatePassword),
);

export { router as usersRoute };
