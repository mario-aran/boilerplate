import { JWT_SECRET } from '@/config/env';
import { db } from '@/lib/drizzle/db';
import { usersTable } from '@/lib/drizzle/schemas';
import { JWT_COOKIE } from '@/lib/passport/constants';
import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

// Utils
const jwtCookieExtractor = (req: Request) => req.cookies?.[JWT_COOKIE] ?? null;

export const jwtStrategy = new Strategy(
  {
    jwtFromRequest: jwtCookieExtractor,
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
