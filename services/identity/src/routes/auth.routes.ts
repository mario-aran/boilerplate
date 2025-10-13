import { PATH_SEGMENTS } from '@/constants/paths';
import {
  login,
  refreshToken,
  register,
  resendEmailVerification,
  verifyEmail,
} from '@/controllers/auth.controller';
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resendEmailVerificationSchema,
  verifyEmailSchema,
} from '@/lib/zod/schemas/auth.schema';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const authRoutes = Router();

authRoutes.get(
  PATH_SEGMENTS.VERIFY_EMAIL,
  zodValidator({ query: verifyEmailSchema }),
  verifyEmail,
);

authRoutes.post(
  PATH_SEGMENTS.REGISTER,
  zodValidator({ body: registerSchema }),
  register,
);

authRoutes.post(
  PATH_SEGMENTS.RESEND_EMAIL_VERIFICATION,
  zodValidator({ body: resendEmailVerificationSchema }),
  resendEmailVerification,
);

authRoutes.post(
  PATH_SEGMENTS.LOGIN,
  zodValidator({ body: loginSchema }),
  login,
);

authRoutes.post(
  PATH_SEGMENTS.REFRESH_TOKEN,
  zodValidator({ body: refreshTokenSchema }),
  refreshToken,
);
