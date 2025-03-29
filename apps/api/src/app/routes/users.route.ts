import { usersController } from '@/features/users/users.controller';
import { catchAsync } from '@/utils/catch-async';
import { Router } from 'express';

// Constants
const ROUTE_ID_PARAM = '/:id';

export const usersRoute = Router();

// Route definitions
usersRoute.get('/', catchAsync(usersController.getAll));
usersRoute.get(ROUTE_ID_PARAM, catchAsync(usersController.get));
usersRoute.patch(ROUTE_ID_PARAM, catchAsync(usersController.update));

usersRoute.patch(
  `${ROUTE_ID_PARAM}/role`,
  catchAsync(usersController.updateRole),
);

usersRoute.patch(
  `${ROUTE_ID_PARAM}/password`,
  catchAsync(usersController.updatePassword),
);
