import { usersController } from '@/features/users/users.controller';
import { Router } from 'express';

// Constants
const USERS_ROUTE = '/users';

export const usersRoute = Router();

// Define routes here
usersRoute
  .get(USERS_ROUTE, usersController.getAll)
  .get(`${USERS_ROUTE}/:id`, usersController.get)
  .post(USERS_ROUTE, usersController.create)
  .put(`${USERS_ROUTE}/:id`, usersController.update)
  .delete(`${USERS_ROUTE}/:id`, usersController.delete);
