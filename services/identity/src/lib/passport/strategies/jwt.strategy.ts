import { JWT_ACCESS_SECRET } from '@/config/env';
import { JwtUser } from '@/lib/passport/types';
import { usersService } from '@/services/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_ACCESS_SECRET,
};

export const jwtStrategy = new Strategy(opts, async (payload, done) => {
  try {
    // Failed: user not found
    const user = await usersService.get({ id: payload.id });
    if (!user) return done(null, false);

    // Succeeded
    const jwtUser: JwtUser = { id: user.id };
    return done(null, jwtUser);
  } catch (err) {
    // Failed: internal error
    return done(err, false);
  }
});
