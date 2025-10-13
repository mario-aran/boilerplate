import { authService } from '@/features/auth/auth.service';
import { VerifyEmail } from '@/lib/zod/schemas/auth.schema';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { controllerCatchAsync } from './utils';

export const register = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const { email } = await authService.register(req.body);
    res.status(StatusCodes.CREATED).json({
      message: `Registration successful. Verification will be sent to ${email} shortly`,
    });
  },
);

export const resendEmailVerification = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const { email } = await authService.resendEmailVerification(req.body);
    res.json({ message: `Verification will be sent to ${email} shortly` });
  },
);

export const verifyEmail = controllerCatchAsync(
  async (
    req: Request<unknown, unknown, unknown, VerifyEmail>,
    res: Response,
  ) => {
    await authService.verifyEmail(req.query);
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
