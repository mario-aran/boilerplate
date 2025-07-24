import { JWT_SECRET } from '@/config/env';
import { JwtPayload } from '@/lib/jsonwebtoken/types';
import { usersService } from '@/services/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

export const jwtStrategy = new Strategy(
  opts,
  async (payload: JwtPayload, done) => {
    try {
      // Failed: User not found
      const user = await usersService.get(payload.userId);
      if (!user) return done(null, false);

      // Succeeded: Attached values to "req.user"
      return done(null, { id: user.id });
    } catch (err) {
      // Failed: Internal error
      return done(err, false);
    }
  },
);
