import { db } from '@/lib/drizzle/db';
import { usersTable } from '@/lib/drizzle/schemas';
import { signJwtToken } from '@/lib/passport/utils';
import { LoginAuth } from '@/lib/zod/schemas/auth.schema';
import { NotFoundError, UnauthorizedError } from '@/utils/errors';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

class AuthService {
  public login = async ({ email, password }: LoginAuth) => {
    const userExists = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!userExists) throw new NotFoundError({ message: 'User not found' });

    const passwordIsValid = await bcrypt.compare(password, userExists.password);
    if (!passwordIsValid)
      throw new UnauthorizedError({ message: 'Invalid password' });

    return {
      token: signJwtToken({ id: userExists.id, email: userExists.email }),
    };
  };
}

export const authService = new AuthService();
