import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { Request, Response } from 'express';
import { authService } from './auth.service';

class AuthController {
  public async login(req: Request, res: Response) {
    const user = await authService.login(req.body);
    if (!user)
      throw new HttpError(HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials');

    res.json({ message: `User ${user.email} logged in successfully` });
  }
}

export const authController = new AuthController();
