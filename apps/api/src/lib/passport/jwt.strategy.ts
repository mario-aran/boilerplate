import { JWT_SECRET } from '@/config/env';
import { COOKIES } from '@/constants/cookies';
import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

// Utils
const jwtCookieExtractor = (req: Request) => req.cookies?.[COOKIES.JWT] ?? null;

// Initial values
const opts = {
  jwtFromRequest: jwtCookieExtractor,
  secretOrKey: JWT_SECRET,
};

export const jwtStrategy = new Strategy(opts, async (payload, done) => {
  try {
    const userExists = await db.query.usersSchema.findFirst({
      where: eq(usersSchema.id, payload.id),
    });

    // User not found
    if (!userExists) return done(null, false);

    // Valid jwt
    return done(null, userExists);
  } catch (err) {
    // Error
    return done(err, false);
  }
});
