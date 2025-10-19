import {
  AccessDeniedError,
  EmailAlreadyVerifiedError,
  InvalidCredentialsError,
} from '@/errors/http-errors';
import { emailQueueService } from '@/features/email/email-queue.service';
import { usersService } from '@/features/users/users.service';
import {
  Login,
  RefreshToken,
  Register,
  ResendVerificationEmail,
  VerifyEmail,
} from '@/lib/zod/schemas/auth.schema';
import bcrypt from 'bcryptjs';
import { JwtPayload } from './types';
import {
  signAccessToken,
  signRefreshToken,
  signVerificationEmailToken,
  verifyRefreshToken,
  verifyVerificationEmailToken,
} from './utils/jwt-handlers';

class AuthService {
  async register(props: Register) {
    const { id, email } = await usersService.create(props);

    await this.signAndQueueVerificationEmail(id, email);
  }

  async resendVerificationEmail({ currentEmail }: ResendVerificationEmail) {
    const user = await usersService.getByEmailWithPassword(currentEmail);
    if (user.emailVerified && !user.pendingEmail)
      throw EmailAlreadyVerifiedError;

    const targetEmail = user.pendingEmail || user.email;
    await this.signAndQueueVerificationEmail(user.id, targetEmail);

    return { targetEmail };
  }

  async verifyEmail({ token }: VerifyEmail) {
    const { userId } = verifyVerificationEmailToken(token);

    const user = await usersService.get(userId);
    if (user.emailVerified && !user.pendingEmail)
      throw EmailAlreadyVerifiedError;

    const { email } = await usersService.update(user.id, {
      emailVerifiedAt: new Date(),
      emailVerified: !user.emailVerified ? true : undefined, // Don't update if already true
      email: user.pendingEmail || undefined, // Prevent empty string
      pendingEmail: null,
    });
    return { email };
  }

  async login({ email, password }: Login) {
    const user = await usersService.getByEmailWithPassword(email);
    if (!user.isActive) throw AccessDeniedError;

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw InvalidCredentialsError;

    const payload: JwtPayload = { userId: user.id };
    return {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload),
    };
  }

  async refreshToken({ token }: RefreshToken) {
    const { userId } = verifyRefreshToken(token);

    const user = await usersService.get(userId);
    if (!user.isActive) throw AccessDeniedError;

    return { accessToken: signAccessToken({ userId: user.id }) };
  }

  private async signAndQueueVerificationEmail(userId: string, email: string) {
    const token = signVerificationEmailToken({ userId });

    await emailQueueService.queueVerificationEmail({ email, token });
  }
}

export const authService = new AuthService();
