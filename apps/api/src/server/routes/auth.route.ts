import { loginAuthZod } from '@/lib/zod/schemas/auth.zod';
import { authController } from '@/server/controllers/auth.controller';
import { zodValidate } from '@/server/middleware/zod-validate';
import { routeCatchAsync } from '@/server/utils/route-catch-async';
import { Router } from 'express';

const authRoute = Router();

// Route definitions
authRoute.post(
  '/login',
  zodValidate({ body: loginAuthZod }),
  routeCatchAsync(authController.login),
);

authRoute.post('/logout', routeCatchAsync(authController.logout));

export { authRoute };
