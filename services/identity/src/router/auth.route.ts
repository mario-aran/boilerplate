import { SEGMENTS } from '@/constants/routes';
import { authController } from '@/features/auth/auth.controller';
import {
  loginSchema,
  registerSchema,
  resendEmailVerificationSchema,
  verifyEmailSchema,
} from '@/lib/zod/schemas/auth.schema';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { Router } from 'express';

export const authRoute = Router();

authRoute.post(
  SEGMENTS.REGISTER,
  validateWithZod({ body: registerSchema }),
  authController.register,
);

authRoute.post(
  SEGMENTS.RESEND_EMAIL_VERIFICATION,
  validateWithZod({ body: resendEmailVerificationSchema }),
  authController.resendEmailVerification,
);

authRoute.post(
  SEGMENTS.VERIFY_EMAIL,
  validateWithZod({ body: verifyEmailSchema }),
  authController.verifyEmail,
);

authRoute.post(
  SEGMENTS.LOGIN,
  validateWithZod({ body: loginSchema }),
  authController.login,
);
