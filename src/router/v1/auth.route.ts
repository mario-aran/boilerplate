import { authController } from '@/features/auth/auth.controller';
import { loginAuthZod } from '@/lib/zod/schemas/auth.zod';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
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

router.post('/logout', authenticateWithPermission(), authController.logout);

export { router as authRoute };
