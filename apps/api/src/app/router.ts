import { Router } from 'express';
import { authRoute } from './routes/auth.route';
import { homeRoute } from './routes/home.route';
import { usersRoute } from './routes/users.route';

export const router = Router();

// Combine all routes
router.use(homeRoute);
router.use(authRoute);
router.use(usersRoute);
