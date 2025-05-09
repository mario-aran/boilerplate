import { JWT_SECRET } from '@/config/env';
import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
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
      const userExists = await db.query.usersSchema.findFirst({
        where: eq(usersSchema.id, payload.id),
      });
      // Fail: user not found
      if (!userExists) return done(null, false);

      // Pass
      return done(null, userExists);
    } catch (err) {
      // Fail: internal error
      return done(err, false);
    }
  },
);
