import {
  createUsersZod,
  getAllUsersZod,
  updatePasswordUsersZod,
  updateUsersZod,
} from '@/lib/zod/schemas/users.zod';
import { zodValidate } from '@/middleware/zod-validate';
import { usersController } from '@/server/controllers/users.controller';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

// Constants
const BASE_PATH = '/';
const ID_PATH = '/:id';
const ID_PASSWORD_PATH = '/:id/password';

const usersRoute = Router();

// Route definitions
usersRoute.get(
  BASE_PATH,
  zodValidate({ query: getAllUsersZod }),
  routeCatchAsync(usersController.getAll),
);

usersRoute.post(
  BASE_PATH,
  zodValidate({ body: createUsersZod }),
  routeCatchAsync(usersController.create),
);

usersRoute.get(ID_PATH, routeCatchAsync(usersController.get));

usersRoute.patch(
  ID_PATH,
  zodValidate({ body: updateUsersZod }),
  routeCatchAsync(usersController.update),
);

usersRoute.patch(
  ID_PASSWORD_PATH,
  zodValidate({ body: updatePasswordUsersZod }),
  routeCatchAsync(usersController.updatePassword),
);

export { usersRoute };
