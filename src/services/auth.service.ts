import { db } from '@/lib/drizzle/db';
import { usersTable } from '@/lib/drizzle/schemas';
import { signJwtToken } from '@/lib/passport/utils';
import { LoginAuth } from '@/lib/zod/schemas/auth.schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

class AuthService {
  public login = async ({ email, password }: LoginAuth) => {
    const userExists = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!userExists) return null;

    const passwordIsValid = await bcrypt.compare(password, userExists.password);
    if (!passwordIsValid) return null;

    return {
      token: signJwtToken({ id: userExists.id, email: userExists.email }),
    };
  };
}

export const authService = new AuthService();
