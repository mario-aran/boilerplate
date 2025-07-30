import { emailService } from '@/features/email/email.service';
import { usersService } from '@/features/users/users.service';
import {
  signAccessToken,
  signRefreshToken,
  verifyEmailVerificationToken,
} from '@/lib/jwt/utils';
import {
  LoginAuth,
  RegisterAuth,
  ResendEmailVerificationAuth,
  VerifyEmailAuth,
} from '@/lib/zod/schemas/auth.schema';
import { HttpError } from '@/utils/http-error';
import { StatusCodes } from 'http-status-codes';
import { validatePassword } from './utils/validate-password';

class AuthService {
  private emailAlreadyVerifiedError = new HttpError({
    message: 'Email already verified',
    httpStatus: StatusCodes.CONFLICT,
  });

  public register = async (props: RegisterAuth) => {
    const { id, email } = await usersService.create(props);

    await emailService.sendEmailVerification(id, email);

    return { email };
  };

  public resendEmailVerification = async ({
    currentEmail,
  }: ResendEmailVerificationAuth) => {
    const { id, email, emailVerified, pendingEmail } =
      await usersService.getByEmailWithPassword(currentEmail);
    if (emailVerified && !pendingEmail) throw this.emailAlreadyVerifiedError;

    const targetEmail = pendingEmail ?? email;
    await emailService.sendEmailVerification(id, targetEmail);

    return { targetEmail };
  };

  public verifyEmail = async ({ token }: VerifyEmailAuth) => {
    const { userId } = verifyEmailVerificationToken(token);

    const user = await usersService.get(userId);
    if (user.emailVerified && !user.pendingEmail)
      throw this.emailAlreadyVerifiedError;

    const { email } = await usersService.update(user.id, {
      emailVerifiedAt: new Date(),
      pendingEmail: null,
      emailVerified: !user.emailVerified ? true : undefined,
      email: user.pendingEmail ?? undefined,
    });
    return { email };
  };

  public login = async ({ email, password }: LoginAuth) => {
    const user = await usersService.getByEmailWithPassword(email);

    await validatePassword(password, user.password);

    const payload = { userId: user.id };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    return { accessToken, refreshToken };
  };
}

export const authService = new AuthService();
