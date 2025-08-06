import { JWT_ACCESS_SECRET } from '@/config/env';
import { JwtPayload } from '@/features/auth/types';
import { usersService } from '@/features/users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_ACCESS_SECRET,
  },
  async (payload: JwtPayload, done) => {
    try {
      const { id } = await usersService.get(payload.userId);

      // Succeeded: Attached values to "req.user"
      return done(null, { id });
    } catch (err) {
      return done(err, false);
    }
  },
);
