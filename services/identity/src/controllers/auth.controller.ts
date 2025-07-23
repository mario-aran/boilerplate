import { authService } from '@/services/auth.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';

class AuthController {
  public register = controllerCatchAsync(
    async (req: Request, res: Response) => {
      const result = await authService.register(req.body);
      res.json(result);
    },
  );
}

export const authController = new AuthController();
