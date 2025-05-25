import { authService } from '@/services/auth.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';

class AuthController {
  public login = controllerCatchAsync(async (req: Request, res: Response) => {
    const { token } = await authService.login(req.body);
    res.json({ token });
  });
}

export const authController = new AuthController();
