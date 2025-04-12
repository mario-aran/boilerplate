import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { LoginAuthZod } from '@/lib/zod/schemas/auth.zod';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

class AuthService {
  public async login(data: LoginAuthZod) {
    const isUserValid = await db.query.usersSchema.findFirst({
      where: eq(usersSchema.email, data.email),
    });
    if (!isUserValid) return null;

    const isPasswordValid = await bcrypt.compare(
      data.password,
      isUserValid.password,
    );
    if (!isPasswordValid) return null;

    return { email: isUserValid.email };
  }
}

export const authService = new AuthService();
