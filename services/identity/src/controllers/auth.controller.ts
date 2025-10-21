import { authService } from '@/features/auth/auth.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const register = controllerCatchAsync(
  async (req: Request, res: Response) => {
    await authService.register(req.body);
    res.status(StatusCodes.CREATED).json({
      message:
        'Registration successful. Verification email will be sent shortly',
    });
  },
);

export const resendEmailVerification = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const { email } = await authService.resendEmailVerification(req.body);
    res.json({
      message: `Verification email will be sent shortly to ${email}`,
    });
  },
);

export const verifyEmail = controllerCatchAsync(
  async (req: Request, res: Response) => {
    await authService.verifyEmail(req.body);
    res.json({ message: 'Email verified successfully' });
  },
);

export const login = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.json(result);
  },
);

export const refreshToken = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.refreshToken(req.body);
    res.json(result);
  },
);

export const forgotPassword = controllerCatchAsync(
  async (req: Request, res: Response) => {
    await authService.forgotPassword(req.body);
    res.json({ message: 'Password reset email will be sent shortly' });
  },
);

export const resetPassword = controllerCatchAsync(
  async (req: Request, res: Response) => {
    await authService.resetPassword(req.body);
    res.json({ message: 'Password has been reset successfully' });
  },
);
