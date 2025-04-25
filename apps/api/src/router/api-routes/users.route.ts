import { usersController } from '@/features/users/users.controller';
import {
  createUserZod,
  getAllUsersZod,
  updateUserPasswordZod,
  updateUserZod,
} from '@/lib/zod/schemas/users.zod';
import { authenticateJwt } from '@/middleware/authenticate-jwt';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

const ID_PATH = '/:id';
const ID_PASSWORD_PATH = '/:id/password';

const router = Router();
router.use(authenticateJwt); // Middleware applied to all routes below

// Route definitions
router.post(
  '/',
  validateWithZod({ body: createUserZod }),
  routeCatchAsync(usersController.create),
);

router.get(
  '/',
  validateWithZod({ query: getAllUsersZod }),
  routeCatchAsync(usersController.getAll),
);

router.get(ID_PATH, routeCatchAsync(usersController.get));

router.patch(
  ID_PATH,
  validateWithZod({ body: updateUserZod }),
  routeCatchAsync(usersController.update),
);

router.patch(
  ID_PASSWORD_PATH,
  validateWithZod({ body: updateUserPasswordZod }),
  routeCatchAsync(usersController.updatePassword),
);

export { router as usersRoute };
