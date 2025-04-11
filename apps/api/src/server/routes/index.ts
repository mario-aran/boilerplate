import { Router } from 'express';
import { authRoute } from './auth.route';
import { homeRoute } from './home.route';
import { usersRoute } from './users.route';

const router = Router();

// Combine routes and declare paths
router.use('/', homeRoute);
router.use('/auth', authRoute);
router.use('/users', usersRoute);

export { router };
