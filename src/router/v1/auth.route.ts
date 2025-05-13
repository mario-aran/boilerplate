import { ROUTE_SEGMENTS } from '@/constants/routes';
import { authController } from '@/features/auth/auth.controller';
import { LoginAuthZod } from '@/lib/zod/schemas/v1/auth.zod';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

export const authRoute = Router();

// Route definitions
authRoute.post(
  ROUTE_SEGMENTS.LOGIN,
  validateWithZod({ body: LoginAuthZod }),
  routeCatchAsync(authController.login),
);

authRoute.post(
  ROUTE_SEGMENTS.LOGOUT,
  authenticateWithPermission('read_users'),
  authController.logout,
);
