import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { signJwtToken } from '@/lib/passport/utils';
import { LoginAuthZod } from '@/lib/zod/schemas/v1/auth.zod';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

class AuthService {
  public async login({ email, password }: LoginAuthZod) {
    const userExists = await db.query.usersSchema.findFirst({
      where: eq(usersSchema.email, email),
    });
    if (!userExists) return null;

    const passwordIsValid = await bcrypt.compare(password, userExists.password);
    if (!passwordIsValid) return null;

    const token = signJwtToken({ id: userExists.id, email: userExists.email });
    return { token, email: userExists.email };
  }
}

export const authService = new AuthService();
