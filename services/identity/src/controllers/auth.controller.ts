import { authService } from '@/features/auth/auth.service';
import { VerifyEmail } from '@/lib/zod/schemas/auth.schema';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const register = controllerCatchAsync(
  async (req: Request, res: Response) => {
    await authService.register(req.body);
    res.status(StatusCodes.CREATED).json({
      message: `Registration successful. Verification will be sent shortly`,
    });
  },
);

export const resendVerificationEmail = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const { targetEmail } = await authService.resendVerificationEmail(req.body);
    res.json({
      message: `Verification will be sent to ${targetEmail} shortly`,
    });
  },
);

export const verifyEmail = controllerCatchAsync(
  async (
    req: Request<unknown, unknown, unknown, VerifyEmail>,
    res: Response,
  ) => {
    const { email } = await authService.verifyEmail(req.query);
    res.json({ message: `Email ${email} verified successfully` });
  },
);

export const login = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.json(result);
  },
);

export const refreshToken = (req: Request, res: Response) => {
  const result = authService.refreshToken(req.body);
  res.json(result);
};
