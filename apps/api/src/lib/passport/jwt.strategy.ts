import { JWT_SECRET } from '@/config/env';
import { COOKIES } from '@/constants/cookies';
import { HTTP_STATUS } from '@/constants/http-status';
import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { HttpError } from '@/utils/http-error';
import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

// Utils
const jwtCookieExtractor = (req: Request) => req.cookies?.[COOKIES.JWT] ?? null;

// Initial values
const strategyOptions = {
  jwtFromRequest: jwtCookieExtractor,
  secretOrKey: JWT_SECRET,
};

const unauthorizedError = new HttpError(
  HTTP_STATUS.UNAUTHORIZED,
  'Unauthorized',
);

export const jwtStrategy = new Strategy(
  strategyOptions,
  async (payload, done) => {
    try {
      const userExists = await db.query.usersSchema.findFirst({
        where: eq(usersSchema.id, payload.id),
      });

      // Pass user error
      if (!userExists) return done(unauthorizedError, false);

      // Pass ok
      return done(null, userExists);
    } catch (err) {
      // Pass error
      return done(err, false);
    }
  },
);
