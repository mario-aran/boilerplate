import { usersController } from '@/features/users/users.controller';
import { Router } from 'express';

// Constants
const ROUTE_USERS = '/users';
const ROUTE_USER_ID = '/users/:id';

export const usersRoute = Router();

// Route definitions
usersRoute.get(ROUTE_USERS, usersController.getAll);

usersRoute.get(ROUTE_USER_ID, usersController.get);
usersRoute.patch(ROUTE_USER_ID, usersController.update);
usersRoute.patch(`${ROUTE_USER_ID}/status`, usersController.updateStatus);
usersRoute.patch(`${ROUTE_USER_ID}/role`, usersController.updateRole);
usersRoute.patch(`${ROUTE_USER_ID}/password`, usersController.updatePassword);
usersRoute.delete(ROUTE_USER_ID, usersController.delete);
