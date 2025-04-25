import { JWT_SECRET } from '@/config/env';
import { COOKIES } from '@/constants/cookies';
import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

// Utils
const jwtCookieExtractor = (req: Request) => req.cookies?.[COOKIES.JWT] ?? null;

const strategyOptions = {
  jwtFromRequest: jwtCookieExtractor,
  secretOrKey: JWT_SECRET,
};

export const jwtStrategy = new Strategy(
  strategyOptions,
  async (payload, done) => {
    try {
      const userExists = await db.query.usersSchema.findFirst({
        where: eq(usersSchema.id, payload.id),
      });

      if (!userExists) return done(null, false);

      return done(null, userExists);
    } catch (err) {
      return done(err, false);
    }
  },
);
