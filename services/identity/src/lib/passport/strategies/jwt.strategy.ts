import { JWT_ACCESS_SECRET } from '@/config/env';
import { JwtPayload } from '@/lib/jwt/types';
import { usersService } from '@/services/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_ACCESS_SECRET,
};

export const jwtStrategy = new Strategy(
  opts,
  async (payload: JwtPayload, done) => {
    try {
      const { id } = await usersService.read(payload.userId);

      // Succeeded: Attached values to "req.user"
      return done(null, { id });
    } catch (err) {
      // Failed
      return done(err, false);
    }
  },
);
