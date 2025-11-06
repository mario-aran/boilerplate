import { authService } from '@/features/auth/auth.service';
import {
  ForgotPassword,
  Login,
  RefreshToken,
  Register,
  ResendEmailVerification,
  ResetPassword,
  VerifyEmail,
} from '@/lib/zod/schemas/auth.schema';
import { TypedRequest } from '@/types/typed-request';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const register = controllerCatchAsync(
  async (req: TypedRequest<{ body: Register }>, res: Response) => {
    await authService.register(req.body);
    res.status(StatusCodes.CREATED).json({
      message:
        'Registration successful. Verification email will be sent shortly',
    });
  },
);

export const verifyEmail = controllerCatchAsync(
  async (req: TypedRequest<{ body: VerifyEmail }>, res: Response) => {
    await authService.verifyEmail(req.body);
    res.json({ message: 'Email verified successfully' });
  },
);

export const resendEmailVerification = controllerCatchAsync(
  async (
    req: TypedRequest<{ body: ResendEmailVerification }>,
    res: Response,
  ) => {
    const { email } = await authService.resendEmailVerification(req.body);
    res.json({
      message: `Verification email will be sent shortly to ${email}`,
    });
  },
);

export const forgotPassword = controllerCatchAsync(
  async (req: TypedRequest<{ body: ForgotPassword }>, res: Response) => {
    await authService.forgotPassword(req.body);
    res.json({ message: 'Password reset email will be sent shortly' });
  },
);

export const resetPassword = controllerCatchAsync(
  async (req: TypedRequest<{ body: ResetPassword }>, res: Response) => {
    await authService.resetPassword(req.body);
    res.json({ message: 'Password has been reset successfully' });
  },
);

export const login = controllerCatchAsync(
  async (req: TypedRequest<{ body: Login }>, res: Response) => {
    const result = await authService.login(req.body);
    res.json(result);
  },
);

export const refreshToken = controllerCatchAsync(
  async (req: TypedRequest<{ body: RefreshToken }>, res: Response) => {
    const result = await authService.refreshToken(req.body);
    res.json(result);
  },
);
