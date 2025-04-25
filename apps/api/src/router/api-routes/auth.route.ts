import { authController } from '@/features/auth/auth.controller';
import { loginAuthZod } from '@/lib/zod/schemas/auth.zod';
import { authenticateJwt } from '@/middleware/authenticate-jwt';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

const router = Router();

// Route definitions
router.post(
  '/login',
  validateWithZod({ body: loginAuthZod }),
  routeCatchAsync(authController.login),
);

router.post('/logout', authenticateJwt, authController.logout);

export { router as authRoute };
