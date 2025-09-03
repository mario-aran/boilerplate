import { emailQueueService } from '@/features/email/email-queue.service';
import { usersService } from '@/features/users/users.service';
import {
  LoginAuth,
  RegisterAuth,
  ResendEmailVerificationAuth,
  VerifyEmailAuth,
} from '@/lib/zod/schemas/auth.schema';
import { HttpError } from '@/utils/http-error';
import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from './types';
import {
  signAccessToken,
  signEmailVerificationToken,
  signRefreshToken,
  validateEmailVerificationToken,
} from './utils/jwt-handlers';

// Types
interface SignAndQueueEmailVerificationProps {
  userId: string;
  email: string;
}

interface ThrowIfEmailVerifiedProps {
  emailVerified: boolean;
  pendingEmail: string | null;
}

class AuthService {
  async verifyEmail({ token }: VerifyEmailAuth) {
    const { userId } = validateEmailVerificationToken(token);

    const user = await usersService.get(userId);
    this.throwIfEmailVerified({
      emailVerified: user.emailVerified,
      pendingEmail: user.pendingEmail,
    });

    const { email } = await usersService.update(user.id, {
      emailVerifiedAt: new Date(),
      emailVerified: !user.emailVerified ? true : undefined,
      email: user.pendingEmail || undefined,
      pendingEmail: null,
    });
    return { email };
  }

  async register(props: RegisterAuth) {
    const { id, email } = await usersService.create(props);

    await this.signAndQueueEmailVerification({ userId: id, email });

    return { email };
  }

  async resendEmailVerification({ currentEmail }: ResendEmailVerificationAuth) {
    const user = await usersService.getByEmailWithPassword(currentEmail);
    this.throwIfEmailVerified({
      emailVerified: user.emailVerified,
      pendingEmail: user.pendingEmail,
    });

    const email = user.pendingEmail || user.email;
    await this.signAndQueueEmailVerification({ userId: user.id, email });

    return { email };
  }

  async login({ email, password }: LoginAuth) {
    const user = await usersService.getByEmailWithPassword(email);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      throw new HttpError({
        status: StatusCodes.FORBIDDEN,
        message: 'Invalid credentials',
      });

    const payload: JwtPayload = { userId: user.id };
    return {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload),
    };
  }

  private async signAndQueueEmailVerification({
    userId,
    email,
  }: SignAndQueueEmailVerificationProps) {
    const token = signEmailVerificationToken({ userId });
    await emailQueueService.queueVerification({ email, token });
  }

  private throwIfEmailVerified({
    emailVerified,
    pendingEmail,
  }: ThrowIfEmailVerifiedProps) {
    if (emailVerified && !pendingEmail)
      throw new HttpError({
        status: StatusCodes.CONFLICT,
        message: 'Email already verified',
      });
  }
}

export const authService = new AuthService();
