import { PATH_SEGMENTS } from '@/constants/paths';
import {
  forgotPassword,
  login,
  refreshToken,
  register,
  resendVerificationEmail,
  resetPassword,
  verifyEmail,
} from '@/controllers/auth.controller';
import {
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resendVerificationEmailSchema,
  resetPasswordSchema,
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

authRoutes.post(
  PATH_SEGMENTS.VERIFY_EMAIL,
  zodValidator({ body: verifyEmailSchema }),
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

authRoutes.post(
  PATH_SEGMENTS.FORGOT_PASSWORD,
  zodValidator({ body: forgotPasswordSchema }),
  forgotPassword,
);

authRoutes.post(
  PATH_SEGMENTS.RESET_PASSWORD,
  zodValidator({ body: resetPasswordSchema }),
  resetPassword,
);
