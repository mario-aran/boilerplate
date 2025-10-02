import { JWT_ACCESS_SECRET } from '@/config/env';
import { JwtPayload } from '@/features/auth/types';
import {
  usersService,
  UsersServiceGetResult,
} from '@/features/users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_ACCESS_SECRET,
  },
  async (payload: JwtPayload, done) => {
    try {
      // Ensure user exists and type it to match "passport.authenticate" param
      const user: UsersServiceGetResult = await usersService.get(
        payload.userId,
      );
      return done(null, user);
    } catch (err) {
      // If user not found or another error, pass it to "passport.authenticate"
      return done(err, false);
    }
  },
);
