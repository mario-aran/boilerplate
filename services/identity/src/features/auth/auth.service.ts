import { emailService } from '@/features/email/email.service';
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
import {
  signAccessToken,
  signEmailVerificationToken,
  signRefreshToken,
  validateEmailVerificationToken,
} from './utils/jwt-handlers';

class AuthService {
  private emailAlreadyVerifiedError = new HttpError({
    message: 'Email already verified',
    httpStatus: StatusCodes.CONFLICT,
  });

  private invalidCredentialsError = new HttpError({
    message: 'Invalid credentials',
    httpStatus: StatusCodes.FORBIDDEN,
  });

  public verifyEmail = async ({ token }: VerifyEmailAuth) => {
    const { userId } = validateEmailVerificationToken(token);

    const user = await usersService.get(userId);
    if (user.emailVerified && !user.pendingEmail)
      throw this.emailAlreadyVerifiedError;

    const { email } = await usersService.update(user.id, {
      emailVerifiedAt: new Date(),
      pendingEmail: null,
      emailVerified: !user.emailVerified ? true : undefined,
      email: user.pendingEmail || undefined,
    });
    return { email };
  };

  public register = async (props: RegisterAuth) => {
    const { id, email } = await usersService.create(props);

    await this.signAndEnqueueEmail(id, email);

    return { email };
  };

  public resendEmailVerification = async ({
    currentEmail,
  }: ResendEmailVerificationAuth) => {
    const user = await usersService.getByEmailWithPassword(currentEmail);
    if (user.emailVerified && !user.pendingEmail)
      throw this.emailAlreadyVerifiedError;

    const email = user.pendingEmail ?? user.email;
    await this.signAndEnqueueEmail(user.id, email);

    return { email };
  };

  public login = async ({ email, password }: LoginAuth) => {
    const user = await usersService.getByEmailWithPassword(email);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw this.invalidCredentialsError;

    const payload = { userId: user.id };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    return { accessToken, refreshToken };
  };

  private signAndEnqueueEmail = async (userId: string, email: string) => {
    const token = signEmailVerificationToken({ userId });
    await emailService.enqueueEmailVerification({ email, token });
  };
}

export const authService = new AuthService();
