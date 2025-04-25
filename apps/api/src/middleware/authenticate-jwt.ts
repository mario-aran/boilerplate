import { HTTP_STATUS } from '@/constants/http-status';
import { passport } from '@/lib/passport';
import { JwtUser } from '@/lib/passport/types/jwt-user';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
) =>
  passport.authenticate(
    'jwt',
    { session: false },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: unknown, user: unknown, _: unknown) => {
      // Pass error
      if (err) return next(err);

      // Pass httpError
      const httpError = new HttpError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized');
      if (!user) return next(httpError);

      // Authorize user
      req.user = user as JwtUser;
      return next();
    },
  )(req, res, next);
