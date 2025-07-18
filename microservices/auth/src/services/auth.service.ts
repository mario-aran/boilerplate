import { JWT_ACCESS_SECRET } from '@/config/env';
import { db } from '@/lib/drizzle/db';
import { usersTable } from '@/lib/drizzle/schemas';
import { JwtUser } from '@/lib/passport/types';
import { LoginAuth } from '@/lib/zod/schemas/auth.schema';
import { HttpError } from '@/utils/http-error';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

class AuthService {
  public login = async ({ email, password }: LoginAuth) => {
    const userExists = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!userExists)
      throw new HttpError({
        message: 'User not found',
        httpStatus: StatusCodes.NOT_FOUND,
      });

    const passwordIsValid = await bcrypt.compare(password, userExists.password);
    if (!passwordIsValid)
      throw new HttpError({
        message: 'Invalid password',
        httpStatus: StatusCodes.UNAUTHORIZED,
      });

    const jwtUser: JwtUser = { id: userExists.id };
    return {
      token: jwt.sign(jwtUser, JWT_ACCESS_SECRET, { expiresIn: '15m' }),
    };
  };
}

export const authService = new AuthService();
