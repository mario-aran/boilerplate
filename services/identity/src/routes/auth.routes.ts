import { PARTS } from '@/constants/routes';
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
  PARTS.VERIFY_EMAIL,
  zodValidator({ query: verifyEmailAuthSchema }),
  authController.verifyEmail.bind(authController),
);

authRoutes.post(
  PARTS.REGISTER,
  zodValidator({ body: registerAuthSchema }),
  authController.register.bind(authController),
);

authRoutes.post(
  PARTS.RESEND_EMAIL_VERIFICATION,
  zodValidator({ body: resendEmailVerificationAuthSchema }),
  authController.resendEmailVerification.bind(authController),
);

authRoutes.post(
  PARTS.LOGIN,
  zodValidator({ body: loginAuthSchema }),
  authController.login.bind(authController),
);
