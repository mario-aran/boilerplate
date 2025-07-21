import { SEGMENTS } from '@/constants/routes';
import { Router } from 'express';

export const usersRoute = Router();

usersRoute.get(SEGMENTS.ME);
usersRoute.patch(SEGMENTS.ME);
usersRoute.patch(SEGMENTS.ME_PASSWORD);
usersRoute.delete(SEGMENTS.ME);
