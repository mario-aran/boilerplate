import { VerifyEmail } from '@/lib/zod/schemas/auth.schema';
import { authService } from '@/services/auth.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class AuthController {
  public register = controllerCatchAsync(
    async (req: Request, res: Response) => {
      const { email } = await authService.register(req.body);

      res.status(StatusCodes.CREATED).json({
        message: `Registration successful. Verification email sent to ${email}.`,
      });
    },
  );

  public resendEmailVerification = controllerCatchAsync(
    async (req: Request, res: Response) => {
      const { email } = await authService.resendEmailVerification(req.body);
      res.json({ message: `Verification email sent to ${email}.` });
    },
  );

  public verifyEmail = controllerCatchAsync(
    async (
      req: Request<unknown, unknown, unknown, VerifyEmail>,
      res: Response,
    ) => {
      const { email } = await authService.verifyEmail(req.query);
      res.json({ message: `Email ${email} verified successfully.` });
    },
  );

  public login = controllerCatchAsync(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.json(result);
  });
}

export const authController = new AuthController();
