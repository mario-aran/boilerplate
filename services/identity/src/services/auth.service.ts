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

  public resendEmailVerification = async ({
    email,
  }: ResendEmailVerification) => {
    const user = await usersService.getByEmailWithPassword(email);
    if (user.emailVerified && !user.pendingEmail)
      throw this.emailAlreadyVerifiedError;

    const targetEmail = user.pendingEmail ?? user.email;
    await emailService.sendVerification(user.id, targetEmail);

    return { email };
  };

  public verifyEmail = async ({ token }: VerifyEmail) => {
    const { userId } = verifyEmailVerificationToken(token);

    const { id, emailVerified, pendingEmail } = await usersService.get(userId);
    if (emailVerified && !pendingEmail) throw this.emailAlreadyVerifiedError;

    const updateData = {
      emailVerifiedAt: new Date(),
      pendingEmail: null,
      ...(!emailVerified
        ? { emailVerified: true }
        : pendingEmail
          ? { email: pendingEmail }
          : {}),
    };
    const { email } = await usersService.update(id, updateData);
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
