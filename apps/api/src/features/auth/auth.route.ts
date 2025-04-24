import { loginAuthZod } from '@/lib/zod/schemas/auth.zod';
import { authenticateJwt } from '@/middleware/authenticate-jwt';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

// Define routes with specific middleware
router.post(
  '/login',
  validateWithZod({ body: loginAuthZod }),
  routeCatchAsync(authController.login),
);

router.post('/logout', authenticateJwt, authController.logout);

export { router as authRoute };
