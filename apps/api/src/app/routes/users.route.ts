import { usersController } from '@/features/users/users.controller';
import { usersZod } from '@/features/users/users.zod';
import { zodValidate } from '@/middleware/zod-validate';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Router } from 'express';

// Constants
const ROUTE_ID_PARAM = '/:id';

export const usersRoute = Router();

// Route definitions
usersRoute.get(
  '/',
  zodValidate(usersZod.getAll),
  controllerCatchAsync(usersController.getAll),
);

usersRoute.get(
  ROUTE_ID_PARAM,
  zodValidate(usersZod.get),
  controllerCatchAsync(usersController.get),
);

usersRoute.patch(
  ROUTE_ID_PARAM,
  zodValidate(usersZod.update),
  controllerCatchAsync(usersController.update),
);

usersRoute.patch(
  `${ROUTE_ID_PARAM}/role`,
  zodValidate(usersZod.updateRole),
  controllerCatchAsync(usersController.updateRole),
);

usersRoute.patch(
  `${ROUTE_ID_PARAM}/password`,
  zodValidate(usersZod.updatePassword),
  controllerCatchAsync(usersController.updatePassword),
);
