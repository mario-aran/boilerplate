import {
  AccessDeniedError,
  EmailAlreadyVerifiedError,
  EmailNotVerifiedError,
  InvalidCredentialsError,
} from '@/errors/http-errors';
import { emailQueueService } from '@/features/email/email-queue.service';
import { usersService } from '@/features/users/users.service';
import {
  signAccessToken,
  signRefreshToken,
  verifyEmailVerificationToken,
  verifyPasswordResetToken,
  verifyRefreshToken,
} from '@/lib/jwt/jwt-handlers';
import {
  ForgotPassword,
  Login,
  RefreshToken,
  Register,
  ResendEmailVerification,
  ResetPassword,
  VerifyEmail,
} from '@/lib/zod/schemas/auth.schema';
import bcrypt from 'bcryptjs';

class AuthService {
  async register(props: Register) {
    const createdUser = await usersService.create(props);

    await emailQueueService.queueEmailVerification({
      userId: createdUser.id,
      email: createdUser.email,
    });

    return createdUser;
  }

  async verifyEmail({ token }: VerifyEmail) {
    const { userId } = verifyEmailVerificationToken(token);

    const user = await usersService.get(userId);
    this.guardEmailNotVerified(user);

    const { email } = await usersService.update(user.id, {
      emailVerifiedAt: new Date(),
      emailVerified: user.emailVerified ? undefined : true, // Don't update if already true
      email: user.pendingEmail || undefined, // Prevent empty string
      pendingEmail: null,
    });
    return { email };
  }

  async resendEmailVerification({ currentEmail }: ResendEmailVerification) {
    const user = await usersService.getByEmail(currentEmail);
    this.guardEmailNotVerified(user);

    const email = user.pendingEmail || user.email;
    await emailQueueService.queueEmailVerification({ userId: user.id, email });

    return { email };
  }

  async forgotPassword({ email }: ForgotPassword) {
    const user = await usersService.getByEmail(email);
    this.guardUserVerifiedAndActive(user);

    await emailQueueService.queuePasswordReset({
      userId: user.id,
      email: user.email,
    });
  }

  async resetPassword({ token, newPassword }: ResetPassword) {
    const { userId } = verifyPasswordResetToken(token);

    const user = await usersService.getWithPassword(userId);
    if (!user.isActive) throw AccessDeniedError;

    await usersService.update(user.id, { password: newPassword });
  }

  async login({ email, password }: Login) {
    const user = await usersService.getByEmailWithPassword(email);
    this.guardUserVerifiedAndActive(user);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw InvalidCredentialsError;

    return {
      accessToken: signAccessToken({ userId: user.id }),
      refreshToken: signRefreshToken({ userId: user.id }),
    };
  }

  async refreshToken({ token }: RefreshToken) {
    const { userId } = verifyRefreshToken(token);

    const user = await usersService.get(userId);
    if (!user.isActive) throw AccessDeniedError;

    return { accessToken: signAccessToken({ userId: user.id }) };
  }

  private guardEmailNotVerified(user: {
    emailVerified: boolean;
    pendingEmail: string | null;
  }) {
    if (user.emailVerified && !user.pendingEmail)
      throw EmailAlreadyVerifiedError;
  }

  private guardUserVerifiedAndActive(user: {
    emailVerified: boolean;
    isActive: boolean;
  }) {
    if (!user.emailVerified) throw EmailNotVerifiedError;
    if (!user.isActive) throw AccessDeniedError;
  }
}

export const authService = new AuthService();
