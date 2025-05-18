import { ERROR_CODES } from '@/constants/error-codes';
import { db } from '@/lib/drizzle/db';
import { usersTable } from '@/lib/drizzle/schemas';
import { signJwtToken } from '@/lib/passport/utils';
import { LoginAuth } from '@/lib/zod/schemas/auth.schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

// Types
type LoginResult =
  | {
      errorCode: typeof ERROR_CODES.NOT_FOUND | typeof ERROR_CODES.UNAUTHORIZED;
    }
  | { token: string };

class AuthService {
  public login = async ({
    email,
    password,
  }: LoginAuth): Promise<LoginResult> => {
    const userExists = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!userExists) return { errorCode: ERROR_CODES.NOT_FOUND };

    const passwordIsValid = await bcrypt.compare(password, userExists.password);
    if (!passwordIsValid) return { errorCode: ERROR_CODES.UNAUTHORIZED };

    return {
      token: signJwtToken({ id: userExists.id, email: userExists.email }),
    };
  };
}

export const authService = new AuthService();
