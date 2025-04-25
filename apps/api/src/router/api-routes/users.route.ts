import { usersController } from '@/features/users/users.controller';
import {
  getAllUsersZod,
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
  checkPermission('read_users'),
  validateWithZod({ query: getAllUsersZod }),
  routeCatchAsync(usersController.getAll),
);

router.get(
  ID_PATH,
  checkPermission('read_user'),
  routeCatchAsync(usersController.get),
);

router.patch(
  ID_PATH,
  checkPermission('update_user'),
  validateWithZod({ body: updateUserZod }),
  routeCatchAsync(usersController.update),
);

router.patch(
  ID_PASSWORD_PATH,
  checkPermission('update_user_password'),
  validateWithZod({ body: updateUserPasswordZod }),
  routeCatchAsync(usersController.updatePassword),
);

export { router as usersRoute };
