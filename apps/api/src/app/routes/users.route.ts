import { usersController } from '@/features/users/users.controller';
import { Router } from 'express';

// Constants
const ROUTE_USERS = '/users';
const ROUTE_USER_ID = '/users/:id';

export const usersRoute = Router();

// Route definitions
usersRoute.get(ROUTE_USERS, usersController.getAll);
usersRoute.get(ROUTE_USER_ID, usersController.get);
usersRoute.post(ROUTE_USERS, usersController.create);
usersRoute.put(ROUTE_USER_ID, usersController.update);
usersRoute.delete(ROUTE_USER_ID, usersController.delete);
