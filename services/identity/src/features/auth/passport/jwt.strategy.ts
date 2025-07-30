import { JWT_ACCESS_SECRET } from '@/config/env';
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
      const { id } = await usersService.get(payload.userId);

      return done(null, { id }); // Succeeded: Attached values to "req.user"
    } catch (err) {
      return done(err, false);
    }
  },
);
