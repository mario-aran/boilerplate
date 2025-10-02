import { Permission } from '@/constants/permissions';
import { UsersServiceGetResult } from '@/features/users/users.service';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';

export const authenticateAndAuthorize =
  (permission?: Permission) =>
  (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      'jwt',
      { session: false },
      (err: unknown, user: UsersServiceGetResult | false) => {
        // Authenticate: check strategy errors
        if (err) return next(err);

        // Authenticate: check invalid or missing JWT
        if (!user)
          return next(
            new HttpError({
              status: StatusCodes.UNAUTHORIZED,
              message: 'Unauthorized',
            }),
          );

        // Authenticate: requires manually attaching "req.user" in passport callback mode
        req.user = user;

        // Authorize: check if user has permission
        if (permission && !user.permissionIds.includes(permission))
          return next(
            new HttpError({
              status: StatusCodes.FORBIDDEN,
              message: 'Forbidden',
            }),
          );

        // Succeeded
        return next();
      },
    )(req, res, next);
