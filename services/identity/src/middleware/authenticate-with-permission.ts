import { JwtPayload } from '@/lib/jwt/types';
import { passport } from '@/lib/passport';
import { usersService } from '@/services/users.service';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const authenticateWithPermission = (requiredPermission?: string) => {
  return (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (error: unknown, jwtPayload?: JwtPayload) => {
        // Failed: internal error
        if (error) return next(error);

        // Failed: invalid or missing JWT
        if (!jwtPayload)
          return next(
            new HttpError({
              message: 'Unauthorized',
              httpStatus: StatusCodes.UNAUTHORIZED,
            }),
          );

        // Attach user manually when using callback
        req.user = { id: jwtPayload.userId };

        // Succeeded: user is the owner or doesn't require permission
        const userIsOwner = req.params.id === jwtPayload.userId;
        if (userIsOwner || !requiredPermission) return next();

        try {
          // Succeeded: user has required permission
          const dbUser = await usersService.read(jwtPayload.userId);
          const hasPermission =
            dbUser.permissionIds.includes(requiredPermission);
          if (hasPermission) return next();

          // Failed: user missing or lacks permission
          return next(
            new HttpError({
              message: 'Forbidden',
              httpStatus: StatusCodes.FORBIDDEN,
            }),
          );
        } catch (err) {
          // Failed: users service error
          return next(err);
        }
      },
    )(req, res, next);
};
