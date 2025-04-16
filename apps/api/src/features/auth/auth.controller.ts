import { NODE_ENV } from '@/config/env';
import { COOKIES } from '@/constants/cookies';
import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { Request, Response } from 'express';
import { authService } from './auth.service';

class AuthController {
  public async login(req: Request, res: Response) {
    const record = await authService.login(req.body);
    if (!record)
      throw new HttpError(HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials');

    res.cookie(COOKIES.JWT, record.token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.json({ message: `User ${record.email} logged in successfully` });
  }

  public logout(_: Request, res: Response) {
    res.clearCookie(COOKIES.JWT);
  }
}

export const authController = new AuthController();
