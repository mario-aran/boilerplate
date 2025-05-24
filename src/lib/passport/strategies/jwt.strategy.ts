import { JWT_SECRET } from '@/config/env';
import { db } from '@/lib/drizzle/db';
import { usersTable } from '@/lib/drizzle/schemas';
import { eq } from 'drizzle-orm';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    try {
      // Failed: user not found
      const userExists = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, payload.id),
      });
      if (!userExists) return done(null, false);

      // Succeeded
      return done(null, userExists);
    } catch (err) {
      // Failed: internal error
      return done(err, false);
    }
  },
);
