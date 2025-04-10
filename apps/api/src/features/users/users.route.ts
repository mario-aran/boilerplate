import { usersController } from '@/features/users/users.controller';
import { idReqZod } from '@/lib/zod/common-schemas';
import { zodValidate } from '@/middleware/zod-validate';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';
import {
  getAllReqUsersZod,
  updatePasswordReqUsersZod,
  updateReqUsersZod,
  updateRoleReqUsersZod,
} from './users.zod';

// Constants
const USERS_ID_PATH = ':id';

const usersRoute = Router();

// Route definitions
usersRoute.get(
  '/',
  zodValidate(getAllReqUsersZod),
  routeCatchAsync(usersController.getAll),
);

usersRoute.get(
  `/${USERS_ID_PATH}`,
  zodValidate(idReqZod),
  routeCatchAsync(usersController.get),
);

usersRoute.patch(
  `/${USERS_ID_PATH}`,
  zodValidate(updateReqUsersZod),
  routeCatchAsync(usersController.update),
);

usersRoute.patch(
  `/${USERS_ID_PATH}/role`,
  zodValidate(updateRoleReqUsersZod),
  routeCatchAsync(usersController.updateRole),
);

usersRoute.patch(
  `/${USERS_ID_PATH}/password`,
  zodValidate(updatePasswordReqUsersZod),
  routeCatchAsync(usersController.updatePassword),
);

export { usersRoute };
