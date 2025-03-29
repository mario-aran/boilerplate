import { authController } from '@/features/auth/auth.controller';
import { catchAsync } from '@/utils/catch-async';
import { Router } from 'express';

export const authRoute = Router();

// Route definitions
authRoute.post('/register', catchAsync(authController.register));
authRoute.post('/login', catchAsync(authController.login));
authRoute.post('/logout', catchAsync(authController.logout));
authRoute.post('/refresh', catchAsync(authController.refresh));
authRoute.get('/me', catchAsync(authController.me));
authRoute.post('/forgot-password', catchAsync(authController.forgotPassword));
authRoute.post('/reset-password', catchAsync(authController.resetPassword));
