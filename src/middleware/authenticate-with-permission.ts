import { passport } from '@/lib/passport';
import { JwtUser } from '@/lib/passport/types';
import { usersService } from '@/services/users.service';
import { ForbiddenError, UnauthorizedError } from '@/utils/errors';
import { NextFunction, Request, Response } from 'express';

export const authenticateWithPermission = (requiredPermission?: string) => {
  return (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (error: unknown, user: JwtUser | undefined) => {
        if (error) return next(error); // Failed: internal error
        if (!user) return next(new UnauthorizedError()); // Failed: invalid or missing JWT

        req.user = user; // Attach user manually when using callback

        const userIsOwner = req.params.id === user.id;
        if (userIsOwner || !requiredPermission) return next(); // Succeeded: user is the owner or doesn't require permission

        try {
          const dbUser = await usersService.get({ id: user.id });
          const hasPermission =
            dbUser.permissionIds.includes(requiredPermission);
          if (hasPermission) return next(); // Succeeded: user has required permission

          return next(new ForbiddenError()); // Failed: user missing or lacks permission
        } catch (err) {
          return next(err); // Failed: users service error
        }
      },
    )(req, res, next);
};
