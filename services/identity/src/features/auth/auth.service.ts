import { emailQueueService } from '@/features/email/email-queue.service';
import { usersService } from '@/features/users/users.service';
import {
  Login,
  RefreshToken,
  Register,
  ResendVerificationEmail,
  VerifyEmail,
} from '@/lib/zod/schemas/auth.schema';
import { HttpError } from '@/utils/http-error';
import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from './types';
import {
  signAccessToken,
  signEmailVerificationToken,
  signRefreshToken,
  verifyEmailVerificationToken,
} from './utils/jwt-handlers';

class AuthService {
  private static readonly emailVerifiedError = new HttpError({
    status: StatusCodes.CONFLICT,
    message: 'Email already verified',
  });

  private static readonly credentialsError = new HttpError({
    status: StatusCodes.FORBIDDEN,
    message: 'Invalid credentials',
  });

  async verifyEmail({ token }: VerifyEmail) {
    const { userId } = verifyEmailVerificationToken(token);

    const user = await usersService.get(userId);
    if (user.emailVerified && !user.pendingEmail)
      throw AuthService.emailVerifiedError;

    const { email } = await usersService.update(user.id, {
      emailVerifiedAt: new Date(),
      emailVerified: !user.emailVerified ? true : undefined, // Don't update if already true
      email: user.pendingEmail || undefined, // Prevent empty string
      pendingEmail: null,
    });
    return { email };
  }

  async register(props: Register) {
    const { id, email } = await usersService.create(props);

    await this.signAndQueueEmailVerification(id, email);

    return { email };
  }

  async resendVerificationEmail({ email }: ResendVerificationEmail) {
    const user = await usersService.getByEmailWithPassword(email);
    if (user.emailVerified && !user.pendingEmail)
      throw AuthService.emailVerifiedError;

    const targetEmail = user.pendingEmail || user.email;
    await this.signAndQueueEmailVerification(user.id, targetEmail);

    return { email: targetEmail };
  }

  async login({ email, password }: Login) {
    const user = await usersService.getByEmailWithPassword(email);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw AuthService.credentialsError;

    const payload: JwtPayload = { userId: user.id };
    return {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload),
    };
  }

  async refreshToken({ token }: RefreshToken) {
    const { userId } = verifyEmailVerificationToken(token);

    return { accessToken: signAccessToken({ userId }) };
  }

  private async signAndQueueEmailVerification(userId: string, email: string) {
    const token = signEmailVerificationToken({ userId });
    await emailQueueService.queueVerification({ email, token });
  }
}

export const authService = new AuthService();
