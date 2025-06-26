import { HTTP_STATUS } from '@/constants/http-status';
import { passport } from '@/lib/passport';
import { usersService } from '@/services/users.service';
import { JwtUser } from '@/types/jwt-user';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

export const authenticateWithPermission = (requiredPermission?: string) => {
  return (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (error: unknown, jwtUser?: JwtUser) => {
        // Failed: internal error
        if (error) return next(error);

        // Failed: invalid or missing JWT
        if (!jwtUser)
          return next(
            new HttpError({
              message: 'Unauthorized',
              httpStatus: HTTP_STATUS.UNAUTHORIZED,
            }),
          );

        // Attach user manually when using callback
        req.user = jwtUser;

        // Succeeded: user is the owner or doesn't require permission
        const userIsOwner = req.params.id === jwtUser.id;
        if (userIsOwner || !requiredPermission) return next();

        try {
          // Succeeded: user has required permission
          const dbUser = await usersService.get({ id: jwtUser.id });
          const hasPermission =
            dbUser.permissionIds.includes(requiredPermission);
          if (hasPermission) return next();

          // Failed: user missing or lacks permission
          return next(
            new HttpError({
              message: 'Forbidden',
              httpStatus: HTTP_STATUS.FORBIDDEN,
            }),
          );
        } catch (err) {
          // Failed: users service error
          return next(err);
        }
      },
    )(req, res, next);
};
