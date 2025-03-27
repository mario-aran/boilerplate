import { Router } from 'express';
import { homeRoute } from './routes/home.route';
import { usersRoute } from './routes/users.route';

export const router = Router();

// Router setup
router.use(homeRoute);
router.use(usersRoute);
