import { JWT_SECRET } from '@/config/env';
import { usersService } from '@/services/users.service';
import { JwtUser } from '@/types/jwt-user';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    try {
      // Failed: user not found
      const userExists = await usersService.get({ id: payload.id });
      if (!userExists) return done(null, false);

      // Succeeded
      const jwtUser: JwtUser = { id: userExists.id };
      return done(null, jwtUser);
    } catch (err) {
      // Failed: internal error
      return done(err, false);
    }
  },
);
