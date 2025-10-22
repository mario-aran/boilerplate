import { JWT_ACCESS_SECRET } from '@/config/env';
import { AccessDeniedError } from '@/errors/http-errors';
import { usersService } from '@/features/users/users.service';
import { JwtPayload } from '@/lib/jwt/types';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_ACCESS_SECRET,
  },
  async (payload: JwtPayload, done) => {
    try {
      // Check if user exists
      const user = await usersService.get(payload.userId);
      if (!user.isActive) throw AccessDeniedError;

      // Pass user to "passport.authenticate"
      return done(null, user);
    } catch (err) {
      // Pass error it to "passport.authenticate"
      return done(err, false);
    }
  },
);
