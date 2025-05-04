import { HTTP_STATUS } from '@/constants/http-status';
import { usersService } from '@/features/users/users.service';
import { passport } from '@/lib/passport';
import { JwtUser } from '@/lib/passport/types/jwt-user';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

// HTTP errors
const unauthorizedError = new HttpError(
  HTTP_STATUS.UNAUTHORIZED,
  'Unauthorized',
);

const forbiddenError = new HttpError(HTTP_STATUS.FORBIDDEN, 'Forbidden');

export const authenticateWithPermission = (requiredPermission?: string) => {
  return (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: unknown, user: JwtUser | undefined) => {
        if (err) return next(err); // Fail: passport internal error
        if (!user) return next(unauthorizedError); // Fail: invalid or missing JWT

        // Attach user manually when using a callback
        req.user = user;

        // Pass: user is the owner or no required permission
        const userIsOwner = req.params.id === user.id;
        if (userIsOwner || !requiredPermission) return next();

        // Pass: user has the required permission
        const dbUser = await usersService.read(user.id);
        const hasPermission =
          dbUser?.permissionIds.includes(requiredPermission);
        if (hasPermission) return next();

        // Fail: user missing or lacks permission
        return next(forbiddenError);
      },
    )(req, res, next);
};
