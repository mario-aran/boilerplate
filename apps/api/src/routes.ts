import { authRoute } from '@/features/auth/auth.route';
import { homeRoute } from '@/features/home/home.route';
import { usersRoute } from '@/features/users/users.route';
import { Router } from 'express';

const routes = Router();

// Merge all routes and assign base paths
routes.use('/', homeRoute);
routes.use('/auth', authRoute);
routes.use('/users', usersRoute);

export { routes };
