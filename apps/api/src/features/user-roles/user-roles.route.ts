import {
  createUserRoleZod,
  getAllUserRolesZod,
  updateUserRoleZod,
} from '@/lib/zod/schemas/user-roles.zod';
import { zodValidate } from '@/middleware/zod-validate';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';
import { userRolesController } from './user-roles.controller';

// Constants
const BASE_PATH = '/';
const ID_PATH = '/:id';

const userRolesRoute = Router();

// Route definitions
userRolesRoute.post(
  BASE_PATH,
  zodValidate({ body: createUserRoleZod }),
  routeCatchAsync(userRolesController.create),
);
userRolesRoute.get(
  BASE_PATH,
  zodValidate({ query: getAllUserRolesZod }),
  routeCatchAsync(userRolesController.getAll),
);

userRolesRoute.get(ID_PATH, routeCatchAsync(userRolesController.get));
userRolesRoute.put(
  ID_PATH,
  zodValidate({ body: updateUserRoleZod }),
  routeCatchAsync(userRolesController.update),
);
userRolesRoute.delete(ID_PATH, routeCatchAsync(userRolesController.delete));

export { userRolesRoute };
