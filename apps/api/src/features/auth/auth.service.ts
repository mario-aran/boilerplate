import { JWT_SECRET } from '@/config/env';
import { USER_ROLES } from '@/constants/user-roles';
import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { LoginAuthZod, RegisterAuthZod } from '@/lib/zod/schemas/auth.zod';
import { hashPassword } from '@/utils/hash-password';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

class AuthService {
  public async register(data: RegisterAuthZod) {
    const hashedPassword = await hashPassword(data.password);
    const [createdRecord] = await db
      .insert(usersSchema)
      .values({
        ...data,
        userRoleId: USER_ROLES.USER,
        password: hashedPassword,
      })
      .returning({ email: usersSchema.email });

    return createdRecord;
  }

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
    const token = jwt.sign(
      { id: userExists.id, email: userExists.email },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    return {
      token,
      email: userExists.email,
    };
  }
}

export const authService = new AuthService();
