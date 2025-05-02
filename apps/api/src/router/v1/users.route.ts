import { PERMISSIONS } from '@/constants/permissions';
import { usersController } from '@/features/users/users.controller';
import {
  createUserZod,
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

// Route definitions
router.post(
  '/',
  validateWithZod({ body: createUserZod }),
  routeCatchAsync(usersController.create),
);

router.get(
  '/',
  authenticateJwt,
  checkPermission(PERMISSIONS.READ_USERS),
  validateWithZod({ query: readAllUsersZod }),
  routeCatchAsync(usersController.readAll),
);

router.get(
  ID_PATH,
  authenticateJwt,
  checkPermission(PERMISSIONS.READ_USER),
  routeCatchAsync(usersController.read),
);

router.patch(
  ID_PATH,
  authenticateJwt,
  checkPermission(PERMISSIONS.UPDATE_USER),
  validateWithZod({ body: updateUserZod }),
  routeCatchAsync(usersController.update),
);

router.patch(
  ID_PASSWORD_PATH,
  authenticateJwt,
  checkPermission(PERMISSIONS.UPDATE_USER_PASSWORD),
  validateWithZod({ body: updateUserPasswordZod }),
  routeCatchAsync(usersController.updatePassword),
);

export { router as usersRoute };
