import { HTTP_STATUS_CODES } from '@/constants/http-status-codes';
import { db } from '@/lib/drizzle/db';
import { usersTable } from '@/lib/drizzle/schemas';
import { signJwtToken } from '@/lib/passport/utils';
import { LoginAuth } from '@/lib/zod/schemas/auth.schema';
import { HttpError } from '@/utils/http-error';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

class AuthService {
  public login = async ({ email, password }: LoginAuth) => {
    const userExists = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!userExists)
      throw new HttpError({
        message: 'User not found',
        httpStatusCode: HTTP_STATUS_CODES.NOT_FOUND,
      });

    const passwordIsValid = await bcrypt.compare(password, userExists.password);
    if (!passwordIsValid)
      throw new HttpError({
        message: 'Invalid password',
        httpStatusCode: HTTP_STATUS_CODES.UNAUTHORIZED,
      });

    return {
      token: signJwtToken({ id: userExists.id, email: userExists.email }),
    };
  };
}

export const authService = new AuthService();
