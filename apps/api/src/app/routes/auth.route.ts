import { authController } from '@/features/auth/auth.controller';
import { Router } from 'express';

// Constants
const ROUTE_AUTH = '/auth';

export const authRoute = Router();

// Route definitions
authRoute.post(`${ROUTE_AUTH}/register`, authController.register);
authRoute.post(`${ROUTE_AUTH}/login`, authController.login);
authRoute.post(`${ROUTE_AUTH}/logout`, authController.logout);
authRoute.post(`${ROUTE_AUTH}/refresh`, authController.refresh);
authRoute.get(`${ROUTE_AUTH}/me`, authController.me);
authRoute.post(`${ROUTE_AUTH}/forgot-password`, authController.forgotPassword);
authRoute.post(`${ROUTE_AUTH}/reset-password`, authController.resetPassword);
authRoute.put(`${ROUTE_AUTH}/deactivate`, authController.deactivateAccount);
authRoute.delete(`${ROUTE_AUTH}/delete`, authController.deleteAccount);
