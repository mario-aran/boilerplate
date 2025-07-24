import { authService } from '@/services/auth.service';
import { usersService } from '@/services/users.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class AuthController {
  public register = controllerCatchAsync(
    async (req: Request, res: Response) => {
      const result = await usersService.create(req.body);

      res.status(StatusCodes.CREATED).json({
        message: `User ${result.email} registered successfully. Check your email to verify your account.`,
      });
    },
  );

  public verifyEmail = controllerCatchAsync(
    async (req: Request<{ id: string }>, res: Response) => {
      const result = await authService.verifyEmail(req.params.id);
      res.json({ message: `Email ${result.email} verified successfully.` });
    },
  );

  public login = controllerCatchAsync(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.json(result);
  });
}

export const authController = new AuthController();
