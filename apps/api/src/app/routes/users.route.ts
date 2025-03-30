import { usersController } from '@/features/users/users.controller';
import { usersZod } from '@/features/users/users.zod';
import { zodValidate } from '@/middleware/zod-validate';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

// Constants
const ROUTE_ID_PARAM = '/:id';

export const usersRoute = Router();

// Route definitions
usersRoute.get(
  '/',
  zodValidate(usersZod.getAll),
  routeCatchAsync(usersController.getAll),
);

usersRoute.get(
  ROUTE_ID_PARAM,
  zodValidate(usersZod.get),
  routeCatchAsync(usersController.get),
);

usersRoute.patch(
  ROUTE_ID_PARAM,
  zodValidate(usersZod.update),
  routeCatchAsync(usersController.update),
);

usersRoute.patch(
  `${ROUTE_ID_PARAM}/role`,
  zodValidate(usersZod.updateRole),
  routeCatchAsync(usersController.updateRole),
);

usersRoute.patch(
  `${ROUTE_ID_PARAM}/password`,
  zodValidate(usersZod.updatePassword),
  routeCatchAsync(usersController.updatePassword),
);
