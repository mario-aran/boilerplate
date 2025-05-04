import { PERMISSIONS } from '@/constants/permissions';
import { usersController } from '@/features/users/users.controller';
import {
  createUserZod,
  readAllUsersZod,
  updateUserPasswordZod,
  updateUserZod,
} from '@/lib/zod/schemas/users.zod';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
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
  authenticateWithPermission(PERMISSIONS.READ_USERS),
  validateWithZod({ query: readAllUsersZod }),
  routeCatchAsync(usersController.readAll),
);

router.get(
  ID_PATH,
  authenticateWithPermission(PERMISSIONS.READ_USER),
  routeCatchAsync(usersController.read),
);

router.patch(
  ID_PATH,
  authenticateWithPermission(PERMISSIONS.UPDATE_USER),
  validateWithZod({ body: updateUserZod }),
  routeCatchAsync(usersController.update),
);

router.patch(
  ID_PASSWORD_PATH,
  authenticateWithPermission(PERMISSIONS.UPDATE_USER_PASSWORD),
  validateWithZod({ body: updateUserPasswordZod }),
  routeCatchAsync(usersController.updatePassword),
);

export { router as usersRoute };
