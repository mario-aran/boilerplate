import { loginAuthZod } from '@/lib/zod/schemas/auth.zod';
import { zodValidate } from '@/middleware/zod-validate';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';
import { authController } from './auth.controller';

const authRoute = Router();

// Route definitions
authRoute.post(
  '/login',
  zodValidate({ body: loginAuthZod }),
  routeCatchAsync(authController.login),
);

export { authRoute };
