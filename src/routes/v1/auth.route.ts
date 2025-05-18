import { ROUTE_SEGMENTS } from '@/constants/routes';
import { authController } from '@/controllers/v1/auth.controller';
import { loginAuthSchema } from '@/lib/zod/schemas/v1/auth.schema';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { Router } from 'express';

export const authRoute = Router();

// Route definitions
authRoute.post(
  ROUTE_SEGMENTS.LOGIN,
  validateWithZod({ body: loginAuthSchema }),
  authController.login,
);

authRoute.post(
  ROUTE_SEGMENTS.LOGOUT,
  authenticateWithPermission(),
  authController.logout,
);
