import { ROUTE_SEGMENTS } from '@/constants/routes';
import { authController } from '@/features/auth/auth.controller';
import { loginAuthSchema } from '@/lib/zod/schemas/v1/auth.schema';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Router } from 'express';

export const authRoute = Router();

// Route definitions
authRoute.post(
  ROUTE_SEGMENTS.LOGIN,
  validateWithZod({ body: loginAuthSchema }),
  controllerCatchAsync(authController.login),
);

authRoute.post(
  ROUTE_SEGMENTS.LOGOUT,
  authenticateWithPermission(),
  authController.logout,
);
