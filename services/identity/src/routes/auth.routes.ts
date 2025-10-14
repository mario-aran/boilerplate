import { PATH_SEGMENTS } from '@/constants/paths';
import {
  login,
  refreshToken,
  register,
  resendVerificationEmail,
  verifyEmail,
} from '@/controllers/auth.controller';
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resendVerificationEmailSchema,
  verifyEmailSchema,
} from '@/lib/zod/schemas/auth.schema';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const authRoutes = Router();

authRoutes.post(
  PATH_SEGMENTS.REGISTER,
  zodValidator({ body: registerSchema }),
  register,
);

authRoutes.post(
  PATH_SEGMENTS.RESEND_VERIFICATION_EMAIL,
  zodValidator({ body: resendVerificationEmailSchema }),
  resendVerificationEmail,
);

authRoutes.get(
  PATH_SEGMENTS.VERIFY_EMAIL,
  zodValidator({ query: verifyEmailSchema }),
  verifyEmail,
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
