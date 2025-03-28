import { usersController } from '@/features/users/users.controller';
import { Router } from 'express';

// Constants
const ROUTE_ID_PARAM = '/:id';

export const usersRoute = Router();

// Route definitions
usersRoute.get('/', usersController.getAll);
usersRoute.get(ROUTE_ID_PARAM, usersController.get);
usersRoute.patch(ROUTE_ID_PARAM, usersController.update);
usersRoute.patch(`${ROUTE_ID_PARAM}/role`, usersController.updateRole);
usersRoute.patch(`${ROUTE_ID_PARAM}/password`, usersController.updatePassword);
