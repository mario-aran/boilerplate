import { authService } from '@/features/auth/auth.service';
import { HttpError } from '@/server/utils/http-error';
import { Request, Response } from 'express';

class AuthController {
  public async login(req: Request, res: Response) {
    const user = await authService.login(req.body);
    if (!user) throw new HttpError(401, 'Invalid credentials');

    res.json({ message: `User ${user.email} logged in successfully` });
  }
}

export const authController = new AuthController();
