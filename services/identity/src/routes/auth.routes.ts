import { PATH_SEGMENTS } from '@/constants/paths';
import {
  login,
  register,
  resendEmailVerification,
  verifyEmail,
} from '@/controllers/auth.controller';
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
  verifyEmail,
);

authRoutes.post(
  PATH_SEGMENTS.REGISTER,
  zodValidator({ body: registerAuthSchema }),
  register,
);

authRoutes.post(
  PATH_SEGMENTS.RESEND_EMAIL_VERIFICATION,
  zodValidator({ body: resendEmailVerificationAuthSchema }),
  resendEmailVerification,
);

authRoutes.post(
  PATH_SEGMENTS.LOGIN,
  zodValidator({ body: loginAuthSchema }),
  login,
);
