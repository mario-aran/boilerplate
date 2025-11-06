import { Permission } from '@/constants/permissions';
import { AccessDeniedError, UnauthorizedError } from '@/errors/api-errors';
import { GetUserResult } from '@/features/users/users.service';
import { RequestHandler } from 'express';
import passport from 'passport';

type AuthenticateAndAuthorize = (permission?: Permission) => RequestHandler;
type PassportUser = GetUserResult | false;

export const authenticateAndAuthorize: AuthenticateAndAuthorize =
  (permission) => (req, res, next) => {
    const authenticateJwt = passport.authenticate(
      'jwt',
      { session: false },
      (err: unknown, user: PassportUser) => {
        // Authenticate: check strategy errors
        if (err) {
          next(err);
          return;
        }

        // Authenticate: check invalid or missing JWT
        if (!user) {
          next(UnauthorizedError);
          return;
        }

        // Authenticate: requires manually attaching "req.user" in passport callback mode
        req.user = user;

        // Authorize: check if user has permission
        if (permission && !user.permissionIds.includes(permission)) {
          next(AccessDeniedError);
          return;
        }

        // Succeeded
        next();
      },
    ) as RequestHandler;

    return authenticateJwt(req, res, next);
  };
