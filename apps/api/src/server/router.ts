import { Router } from 'express';
import { authRoute } from './routes/auth.route';
import { homeRoute } from './routes/home.route';
import { usersRoute } from './routes/users.route';

const router = Router();

// Combine routes and declare paths
router.use('/', homeRoute);
router.use('/auth', authRoute);
router.use('/users', usersRoute);

export { router };
