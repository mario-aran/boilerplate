import { NODE_ENV } from '@/config/env';
import { HTTP_STATUS } from '@/constants/http-status';
import { JWT_COOKIE } from '@/lib/passport/constants';
import { authService } from '@/services/auth.service';
import { HttpError } from '@/utils/http-error';
import { Request, Response } from 'express';

class AuthController {
  public async login(req: Request, res: Response) {
    const record = await authService.login(req.body);
    if (!record) this.throwUnauthorizedHttpError();

    res.cookie(JWT_COOKIE, record.token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({ message: 'User logged in successfully' });
  }

  public logout(_: Request, res: Response) {
    res.clearCookie(JWT_COOKIE);

    res.json({ message: 'User logged out successfully' });
  }

  private throwUnauthorizedHttpError(): never {
    throw new HttpError({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: 'Invalid credentials',
    });
  }
}

export const authController = new AuthController();
