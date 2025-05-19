import { NODE_ENV } from '@/config/env';
import { JWT_COOKIE } from '@/lib/passport/constants';
import { authService } from '@/services/auth.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';

class AuthController {
  public login = controllerCatchAsync(async (req: Request, res: Response) => {
    const record = await authService.login(req.body);

    res.cookie(JWT_COOKIE, record.token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({ message: 'User logged in successfully' });
  });

  public logout = (_: Request, res: Response) => {
    res.clearCookie(JWT_COOKIE);

    res.json({ message: 'User logged out successfully' });
  };
}

export const authController = new AuthController();
