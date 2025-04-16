import {
  createUserZod,
  getAllUsersZod,
  updateUserPasswordZod,
  updateUserZod,
} from '@/lib/zod/schemas/users.zod';
import { authenticateJwt } from '@/middleware/authenticate-jwt';
import { zodValidate } from '@/middleware/zod-validate';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';
import { usersController } from './users.controller';

// Constants
const BASE_PATH = '/';
const ID_PATH = '/:id';
const ID_PASSWORD_PATH = '/:id/password';

const usersRoute = Router();

// Middleware applied to all routes below
usersRoute.use(authenticateJwt);

// Route definitions
usersRoute.post(
  BASE_PATH,
  zodValidate({ body: createUserZod }),
  routeCatchAsync(usersController.create),
);

usersRoute.get(
  BASE_PATH,
  zodValidate({ query: getAllUsersZod }),
  routeCatchAsync(usersController.getAll),
);

usersRoute.get(ID_PATH, routeCatchAsync(usersController.get));

usersRoute.patch(
  ID_PATH,
  zodValidate({ body: updateUserZod }),
  routeCatchAsync(usersController.update),
);

usersRoute.patch(
  ID_PASSWORD_PATH,
  zodValidate({ body: updateUserPasswordZod }),
  routeCatchAsync(usersController.updatePassword),
);

export { usersRoute };
