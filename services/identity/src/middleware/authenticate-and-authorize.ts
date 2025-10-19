import { Permission } from '@/constants/permissions';
import { ForbiddenError, UnauthorizedError } from '@/errors/http-errors';
import { UsersServiceGetResult } from '@/features/users/users.service';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

type PassportUser = UsersServiceGetResult | false;

export const authenticateAndAuthorize =
  (permission?: Permission) =>
  (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      'jwt',
      { session: false },
      (err: unknown, user: PassportUser) => {
        // Authenticate: check strategy errors
        if (err) return next(err);

        // Authenticate: check invalid or missing JWT
        if (!user) return next(UnauthorizedError);

        // Authenticate: requires manually attaching "req.user" in passport callback mode
        req.user = user;

        // Authorize: check if user has permission
        if (permission && !user.permissionIds.includes(permission))
          return next(ForbiddenError);

        // Succeeded
        return next();
      },
    )(req, res, next);
