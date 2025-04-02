import { JWT_SECRET } from '@/config/env';
import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { eq } from 'drizzle-orm';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await db.query.usersSchema.findFirst({
        columns: { password: false },
        where: eq(usersSchema.id, payload.id),
      });

      if (!user) return done(null, false); // Authentication failed
      return done(null, user); // Authentication success
    } catch (error) {
      return done(error); // Authentication error
    }
  }),
);

export const jwtStrategy = passport.authenticate('jwt', { session: false });
