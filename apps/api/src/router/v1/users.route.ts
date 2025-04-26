import { PERMISSIONS } from '@/constants/permissions';
import { usersController } from '@/features/users/users.controller';
import {
  readAllUsersZod,
  updateUserPasswordZod,
  updateUserZod,
} from '@/lib/zod/schemas/users.zod';
import { authenticateJwt } from '@/middleware/authenticate-jwt';
import { checkPermission } from '@/middleware/check-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

const ID_PATH = '/:id';
const ID_PASSWORD_PATH = '/:id/password';

const router = Router();
router.use(authenticateJwt); // // Apply JWT to all subsequent routes

// Route definitions
router.get(
  '/',
  checkPermission(PERMISSIONS.READ_USERS),
  validateWithZod({ query: readAllUsersZod }),
  routeCatchAsync(usersController.readAll),
);

router.get(
  ID_PATH,
  checkPermission(PERMISSIONS.READ_USER),
  routeCatchAsync(usersController.read),
);

router.patch(
  ID_PATH,
  checkPermission(PERMISSIONS.UPDATE_USER),
  validateWithZod({ body: updateUserZod }),
  routeCatchAsync(usersController.update),
);

router.patch(
  ID_PASSWORD_PATH,
  checkPermission(PERMISSIONS.UPDATE_USER_PASSWORD),
  validateWithZod({ body: updateUserPasswordZod }),
  routeCatchAsync(usersController.updatePassword),
);

export { router as usersRoute };
