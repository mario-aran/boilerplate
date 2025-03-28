import { authController } from '@/features/auth/auth.controller';
import { Router } from 'express';

export const authRoute = Router();

// Route definitions
authRoute.post('/register', authController.register);
authRoute.post('/login', authController.login);
authRoute.post('/logout', authController.logout);
authRoute.post('/refresh', authController.refresh);
authRoute.get('/me', authController.me);
authRoute.post('/forgot-password', authController.forgotPassword);
authRoute.post('/reset-password', authController.resetPassword);
