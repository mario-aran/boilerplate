import {
  AccessDeniedError,
  EmailAlreadyVerifiedError,
  EmailNotVerifiedError,
} from '@/errors/api-errors';
import { emailQueueService } from '@/features/email/email-queue.service';
import { usersService } from '@/features/users/users.service';
import { guardPassword } from '@/lib/bcrypt/utils';
import {
  signAccessToken,
  signRefreshToken,
  verifyEmailVerificationToken,
  verifyPasswordResetToken,
  verifyRefreshToken,
} from '@/lib/jwt/utils';
import {
  ForgotPassword,
  Login,
  RefreshToken,
  Register,
  ResendEmailVerification,
  ResetPassword,
  VerifyEmail,
} from '@/lib/zod/schemas/auth.schema';
import { coerceFalsyToUndefined } from '@/utils/coerce-falsy-to-undefined';

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

    const { email } = await usersService.forceUpdate(user.id, {
      emailVerifiedAt: new Date(),
      emailVerified: user.emailVerified ? undefined : true, // Don't update if already true
      email: coerceFalsyToUndefined(user.pendingEmail) ?? undefined, // Prevent empty string
      pendingEmail: null,
    });
    return { email };
  }

  async resendEmailVerification({ currentEmail }: ResendEmailVerification) {
    const user = await usersService.getByEmail(currentEmail);
    this.guardEmailNotVerified(user);

    const email = coerceFalsyToUndefined(user.pendingEmail) ?? user.email;
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

    await usersService.forceUpdate(user.id, { password: newPassword });
  }

  async login({ email, password }: Login) {
    const user = await usersService.getByEmailWithPassword(email);
    await guardPassword(password, user.password);
    this.guardUserVerifiedAndActive(user);

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
