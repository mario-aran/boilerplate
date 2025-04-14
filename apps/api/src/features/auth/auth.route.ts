import { authController } from '@/features/auth/auth.controller';
import { loginAuthZod } from '@/lib/zod/schemas/auth.zod';
import { zodValidate } from '@/middleware/zod-validate';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

const authRoute = Router();

// Route definitions
authRoute.post(
  '/login',
  zodValidate({ body: loginAuthZod }),
  routeCatchAsync(authController.login),
);

export { authRoute };
