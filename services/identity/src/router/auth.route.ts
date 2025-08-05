import { SEGMENTS } from '@/constants/routes';
import { authController } from '@/controllers/auth.controller';
import {
  loginAuthSchema,
  registerAuthSchema,
  resendEmailVerificationAuthSchema,
  verifyEmailAuthSchema,
} from '@/lib/zod/schemas/auth.schema';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const authRoute = Router();

authRoute.get(
  SEGMENTS.VERIFY_EMAIL,
  zodValidator({ query: verifyEmailAuthSchema }),
  authController.verifyEmail,
);

authRoute.post(
  SEGMENTS.REGISTER,
  zodValidator({ body: registerAuthSchema }),
  authController.register,
);

authRoute.post(
  SEGMENTS.RESEND_EMAIL_VERIFICATION,
  zodValidator({ body: resendEmailVerificationAuthSchema }),
  authController.resendEmailVerification,
);

authRoute.post(
  SEGMENTS.LOGIN,
  zodValidator({ body: loginAuthSchema }),
  authController.login,
);
