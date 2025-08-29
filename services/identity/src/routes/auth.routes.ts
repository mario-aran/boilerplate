import { PATH_SEGMENTS } from '@/constants/paths';
import { authController } from '@/controllers/auth.controller';
import {
  loginAuthSchema,
  registerAuthSchema,
  resendEmailVerificationAuthSchema,
  verifyEmailAuthSchema,
} from '@/lib/zod/schemas/auth.schema';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const authRoutes = Router();

authRoutes.get(
  PATH_SEGMENTS.VERIFY_EMAIL,
  zodValidator({ query: verifyEmailAuthSchema }),
  authController.verifyEmail.bind(authController),
);

authRoutes.post(
  PATH_SEGMENTS.REGISTER,
  zodValidator({ body: registerAuthSchema }),
  authController.register.bind(authController),
);

authRoutes.post(
  PATH_SEGMENTS.RESEND_EMAIL_VERIFICATION,
  zodValidator({ body: resendEmailVerificationAuthSchema }),
  authController.resendEmailVerification.bind(authController),
);

authRoutes.post(
  PATH_SEGMENTS.LOGIN,
  zodValidator({ body: loginAuthSchema }),
  authController.login.bind(authController),
);
