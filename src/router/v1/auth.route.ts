import { ROUTE_PATHS } from '@/constants/routes';
import { authController } from '@/features/auth/auth.controller';
import { LoginAuthZod } from '@/lib/zod/schemas/v1/auth.zod';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

// Router
const router = Router();

// Route definitions
router.post(
  ROUTE_PATHS.AUTH_LOGIN,
  validateWithZod({ body: LoginAuthZod }),
  routeCatchAsync(authController.login),
);

router.post(
  ROUTE_PATHS.AUTH_LOGOUT,
  authenticateWithPermission('read_users'),
  authController.logout,
);

export { router as authRoute };
