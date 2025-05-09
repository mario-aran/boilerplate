import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { signJwtToken } from '@/lib/passport/utils/sign-jwt-token';
import { LoginAuthZod } from '@/lib/zod/schemas/v1/auth.zod';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

class AuthService {
  public async login({ email, password }: LoginAuthZod) {
    // Check user
    const userExists = await db.query.usersSchema.findFirst({
      where: eq(usersSchema.email, email),
    });
    if (!userExists) return null;

    // Check password
    const passwordValid = await bcrypt.compare(password, userExists.password);
    if (!passwordValid) return null;

    // Generate token
    const token = signJwtToken({
      id: userExists.id,
      email: userExists.email,
    });

    return {
      token,
      email: userExists.email,
    };
  }
}

export const authService = new AuthService();
