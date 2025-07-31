import { SEGMENTS } from '@/constants/routes';
import { authController } from '@/controllers/auth.controller';
import {
  loginAuthSchema,
  registerAuthSchema,
  resendEmailVerificationAuthSchema,
  verifyEmailAuthSchema,
} from '@/lib/zod/schemas/auth.schema';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { Router } from 'express';

export const authRoute = Router();

authRoute.post(
  SEGMENTS.REGISTER,
  validateWithZod({ body: registerAuthSchema }),
  authController.register,
);

authRoute.post(
  SEGMENTS.RESEND_EMAIL_VERIFICATION,
  validateWithZod({ body: resendEmailVerificationAuthSchema }),
  authController.resendEmailVerification,
);

authRoute.post(
  SEGMENTS.VERIFY_EMAIL,
  validateWithZod({ body: verifyEmailAuthSchema }),
  authController.verifyEmail,
);

authRoute.post(
  SEGMENTS.LOGIN,
  validateWithZod({ body: loginAuthSchema }),
  authController.login,
);
