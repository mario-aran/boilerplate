import { authRoute } from '@/features/auth/auth.route';
import { homeRoute } from '@/features/home/home.route';
import { usersRoute } from '@/features/users/users.route';
import { Router } from 'express';
import { userRolesRoute } from './features/user-roles/user-roles.route';

const routes = Router();

// Merge all routes and assign base paths
routes.use('/', homeRoute);
routes.use('/auth', authRoute);
routes.use('/user-roles', userRolesRoute);
routes.use('/users', usersRoute);

export { routes };
