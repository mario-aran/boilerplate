/*
ok /auth/forgot-password	POST	Send password reset email
ok /auth/reset-password	POST	Update password with token
/auth/verify-email	POST	Verify email with token (or resend)
*/

import { SEGMENTS } from '@/constants/routes';
import { Router } from 'express';

export const authRoute = Router();

authRoute.post(SEGMENTS.REGISTER);
authRoute.post(SEGMENTS.GOOGLE);
authRoute.post();

authRoute.post(SEGMENTS.LOGIN);
authRoute.post(SEGMENTS.REFRESH);
authRoute.post(SEGMENTS.LOGOUT);
