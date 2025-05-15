import { HTTP_STATUS } from '@/constants/http-status';
import { usersService } from '@/features/users/users.service';
import { passport } from '@/lib/passport';
import { JwtUser } from '@/lib/passport/types';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

// Errors
const unauthorizedHttpError = new HttpError({
  status: HTTP_STATUS.UNAUTHORIZED,
  message: 'Unauthorized',
});

const forbiddenHttpError = new HttpError({
  status: HTTP_STATUS.FORBIDDEN,
  message: 'Forbidden',
});

export const authenticateWithPermission = (requiredPermission?: string) => {
  return (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: unknown, user: JwtUser | undefined) => {
        if (err) return next(err); // Failed: internal error
        if (!user) return next(unauthorizedHttpError); // Failed: invalid or missing JWT

        // Attach user manually when using callback
        req.user = user;

        // Succeeded: user is the owner or doesn't require permission
        const userIsOwner = req.params.id === user.id;
        if (userIsOwner || !requiredPermission) return next();

        // Succeeded: user has required permission
        const dbUser = await usersService.get(user.id);
        const hasPermission =
          dbUser?.permissionIds.includes(requiredPermission);
        if (hasPermission) return next();

        // Failed: user missing or lacks permission
        return next(forbiddenHttpError);
      },
    )(req, res, next);
};
