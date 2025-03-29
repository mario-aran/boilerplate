import { authController } from '@/features/auth/auth.controller';
import { authZod } from '@/features/auth/auth.zod';
import { zodValidate } from '@/middleware/zod-validate';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Router } from 'express';

export const authRoute = Router();

// Route definitions
authRoute.post(
  '/register',
  zodValidate(authZod.register),
  controllerCatchAsync(authController.register),
);

authRoute.post(
  '/login',
  zodValidate(authZod.login),
  controllerCatchAsync(authController.login),
);

authRoute.post(
  '/logout',
  zodValidate(authZod.logout),
  controllerCatchAsync(authController.logout),
);

authRoute.post(
  '/refresh',
  zodValidate(authZod.refresh),
  controllerCatchAsync(authController.refresh),
);

authRoute.get(
  '/me',
  zodValidate(authZod.me),
  controllerCatchAsync(authController.me),
);

authRoute.post(
  '/forgot-password',
  zodValidate(authZod.forgotPassword),
  controllerCatchAsync(authController.forgotPassword),
);

authRoute.post(
  '/reset-password',
  zodValidate(authZod.resetPassword),
  controllerCatchAsync(authController.resetPassword),
);
