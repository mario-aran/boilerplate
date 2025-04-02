import { authController } from '@/features/auth/auth.controller';
import { authZod } from '@/features/auth/auth.zod';
import { jwtStrategy } from '@/lib/passport/jwt-strategy';
import { zodValidate } from '@/middleware/zod-validate';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

export const authRoute = Router();

// Route definitions
authRoute.post(
  '/register',
  zodValidate(authZod.register),
  routeCatchAsync(authController.register),
);

authRoute.post(
  '/login',
  zodValidate(authZod.login),
  routeCatchAsync(authController.login),
);

authRoute.post('/logout', routeCatchAsync(authController.logout));

authRoute.post(
  '/refresh',
  zodValidate(authZod.refresh),
  routeCatchAsync(authController.refresh),
);

authRoute.get('/me', jwtStrategy, routeCatchAsync(authController.me));

authRoute.post(
  '/forgot-password',
  zodValidate(authZod.forgotPassword),
  routeCatchAsync(authController.forgotPassword),
);

authRoute.post(
  '/reset-password',
  zodValidate(authZod.resetPassword),
  routeCatchAsync(authController.resetPassword),
);
