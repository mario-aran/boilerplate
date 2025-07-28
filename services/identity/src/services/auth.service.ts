import { validatePassword } from '@/lib/bcrypt/utils';
import {
  signAccessToken,
  signRefreshToken,
  verifyEmailToken,
} from '@/lib/jwt/utils';
import {
  Login,
  ResendEmailVerification,
  VerifyEmail,
} from '@/lib/zod/schemas/auth.schema';
import { CreateUser } from '@/lib/zod/schemas/users.schema';
import { HttpError } from '@/utils/http-error';
import { StatusCodes } from 'http-status-codes';
import { emailService } from './email.service';
import { usersService } from './users.service';

class AuthService {
  private emailAlreadyVerifiedError = new HttpError({
    message: 'Email already verified',
    httpStatus: StatusCodes.CONFLICT,
  });

  public register = async (props: CreateUser) => {
    const { id, email } = await usersService.create(props);

    await emailService.sendVerificationEmail(id, email);

    return { email };
  };

  public resendEmailVerification = async (props: ResendEmailVerification) => {
    const { id, email, emailVerified, pendingEmail } =
      await usersService.readByEmailWithPassword(props.email);
    if (emailVerified && !pendingEmail) throw this.emailAlreadyVerifiedError;

    const targetEmail = pendingEmail ?? email;
    await emailService.sendVerificationEmail(id, targetEmail);

    return { email };
  };

  public verifyEmail = async ({ token }: VerifyEmail) => {
    const { userId } = verifyEmailToken(token);

    const { id, emailVerified, pendingEmail } = await usersService.read(userId);
    if (emailVerified && !pendingEmail) throw this.emailAlreadyVerifiedError;

    const { email } = await usersService.update(id, {
      emailVerifiedAt: new Date(),
      pendingEmail: null,
      ...(!emailVerified ? { emailVerified: true } : { email: pendingEmail }),
    });
    return { email };
  };

  public login = async ({ email, password }: Login) => {
    const user = await usersService.readByEmailWithPassword(email);

    await validatePassword(password, user.password);

    const payload = { userId: user.id };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    return { accessToken, refreshToken };
  };
}

export const authService = new AuthService();
