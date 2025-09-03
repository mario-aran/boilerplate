import { PATH_SEGMENTS } from '@/constants/paths';
import { AuthController } from '@/controllers/auth.controller';
import {
  loginAuthSchema,
  registerAuthSchema,
  resendEmailVerificationAuthSchema,
  verifyEmailAuthSchema,
} from '@/lib/zod/schemas/auth.schema';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const createAuthRoutes = (authController: AuthController) => {
  const router = Router();

  router.get(
    PATH_SEGMENTS.VERIFY_EMAIL,
    zodValidator({ query: verifyEmailAuthSchema }),
    authController.verifyEmail.bind(authController),
  );

  router.post(
    PATH_SEGMENTS.REGISTER,
    zodValidator({ body: registerAuthSchema }),
    authController.register.bind(authController),
  );

  router.post(
    PATH_SEGMENTS.RESEND_EMAIL_VERIFICATION,
    zodValidator({ body: resendEmailVerificationAuthSchema }),
    authController.resendEmailVerification.bind(authController),
  );

  router.post(
    PATH_SEGMENTS.LOGIN,
    zodValidator({ body: loginAuthSchema }),
    authController.login.bind(authController),
  );

  return router;
};
