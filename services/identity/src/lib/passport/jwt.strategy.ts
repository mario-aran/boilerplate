import { JWT_ACCESS_SECRET } from '@/config/env';
import { AccessDeniedError } from '@/errors/api-errors';
import { usersService } from '@/features/users/users.service';
import { JwtPayload } from '@/lib/jwt/types';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_ACCESS_SECRET,
  },
  (payload: JwtPayload, done) => {
    usersService
      .get(payload.userId)
      .then((user) => {
        // Check if user exists
        if (!user.isActive) throw AccessDeniedError;

        // Pass user to "passport.authenticate"
        done(null, user);
      })
      .catch((err: unknown) => {
        // Pass error it to "passport.authenticate"
        done(err, false);
      });
  },
);
