import { Router } from 'express';
import { homeRoute } from './routes/home.route';
import { usersRoute } from './routes/users.route';

export const router = Router();

// Merge routes after router is created
router.use(homeRoute).use(usersRoute);
