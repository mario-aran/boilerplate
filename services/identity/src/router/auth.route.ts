import { SEGMENTS } from '@/constants/routes';
import { Router } from 'express';

export const authRoute = Router();

authRoute.post(SEGMENTS.REGISTER);
authRoute.post(SEGMENTS.VERIFY_EMAIL);
authRoute.post(SEGMENTS.GOOGLE);
authRoute.post(SEGMENTS.LOGIN);
authRoute.post(SEGMENTS.REFRESH);
authRoute.post(SEGMENTS.FORGOT_PASSWORD);
authRoute.post(SEGMENTS.RESET_PASSWORD);
authRoute.post(SEGMENTS.LOGOUT);
