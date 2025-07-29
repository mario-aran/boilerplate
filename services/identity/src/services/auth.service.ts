import { validatePassword } from '@/lib/bcrypt/utils';
import {
  signAccessToken,
  signRefreshToken,
  verifyEmailVerificationToken,
} from '@/lib/jwt/utils';
import {
  Login,
  Register,
  ResendEmailVerification,
  VerifyEmail,
} from '@/lib/zod/schemas/auth.schema';
import { HttpError } from '@/utils/http-error';
import { StatusCodes } from 'http-status-codes';
import { emailService } from './email.service';
import { usersService } from './users.service';

class AuthService {
  private emailAlreadyVerifiedError = new HttpError({
    message: 'Email already verified',
    httpStatus: StatusCodes.CONFLICT,
  });

  public register = async (props: Register) => {
    const { id, email } = await usersService.create(props);

    await emailService.sendVerification(id, email);

    return { email };
  };

  public resendEmailVerification = async (props: ResendEmailVerification) => {
    const { id, email, emailVerified, pendingEmail } =
      await usersService.getByEmailWithPassword(props.email);
    if (emailVerified && !pendingEmail) throw this.emailAlreadyVerifiedError;

    const targetEmail = pendingEmail ?? email;
    await emailService.sendVerification(id, targetEmail);

    return { email };
  };

  public verifyEmail = async ({ token }: VerifyEmail) => {
    const { userId } = verifyEmailVerificationToken(token);

    const { id, emailVerified, pendingEmail } = await usersService.get(userId);
    if (emailVerified && !pendingEmail) throw this.emailAlreadyVerifiedError;

    const conditionalData = !emailVerified
      ? { emailVerified: true }
      : pendingEmail
        ? { email: pendingEmail }
        : {};
    const { email } = await usersService.update(id, {
      emailVerifiedAt: new Date(),
      pendingEmail: null,
      ...conditionalData,
    });
    return { email };
  };

  public login = async ({ email, password }: Login) => {
    const user = await usersService.getByEmailWithPassword(email);

    await validatePassword(password, user.password);

    const payload = { userId: user.id };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    return { accessToken, refreshToken };
  };
}

export const authService = new AuthService();
