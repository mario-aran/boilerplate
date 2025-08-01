import { authService } from '@/features/auth/auth.service';
import { VerifyEmailAuth } from '@/lib/zod/schemas/auth.schema';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { controllerCatchAsync } from './utils/controller-catch-async';

class AuthController {
  public verifyEmail = controllerCatchAsync(
    async (
      req: Request<unknown, unknown, unknown, VerifyEmailAuth>,
      res: Response,
    ) => {
      const { email } = await authService.verifyEmail(req.query);
      res.json({ message: `Email ${email} verified successfully` });
    },
  );

  public register = controllerCatchAsync(
    async (req: Request, res: Response) => {
      const { email } = await authService.register(req.body);

      res.status(StatusCodes.CREATED).json({
        message: `Registration successful. Verification email sent to ${email}`,
      });
    },
  );

  public resendEmailVerification = controllerCatchAsync(
    async (req: Request, res: Response) => {
      const { email } = await authService.resendEmailVerification(req.body);
      res.json({ message: `Verification email sent to ${email}` });
    },
  );

  public login = controllerCatchAsync(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.json(result);
  });
}

export const authController = new AuthController();
