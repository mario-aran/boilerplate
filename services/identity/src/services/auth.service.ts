import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_VERIFY_EMAIL_SECRET,
} from '@/config/env';
import { validatePassword } from '@/lib/bcrypt/utils';
import { JwtPayload } from '@/lib/jwt/types';
import {
  Login,
  Register,
  ResendEmailVerification,
  VerifyEmail,
} from '@/lib/zod/schemas/auth.schema';
import { HttpError } from '@/utils/http-error';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { emailService } from './email.service';
import { usersService } from './users.service';

class AuthService {
  private emailAlreadyVerifiedError = new HttpError({
    message: 'Email already verified',
    httpStatus: StatusCodes.CONFLICT,
  });

  public register = async (props: Register) => {
    const { id, email } = await usersService.create(props);

    await emailService.sendVerificationEmail(id, email);
  };

  public resendEmailVerification = async ({
    email,
  }: ResendEmailVerification) => {
    const user = await usersService.readByEmailWithPassword(email);
    if (user.emailVerified && !user.pendingEmail)
      throw this.emailAlreadyVerifiedError;

    const targetEmail = user.pendingEmail ?? user.email;
    await emailService.sendVerificationEmail(user.id, targetEmail);
  };

  public verifyEmail = async ({ token }: VerifyEmail) => {
    const { userId } = this.verifyEmailToken(token);

    const { id, emailVerified, pendingEmail } = await usersService.read(userId);
    if (emailVerified && !pendingEmail) throw this.emailAlreadyVerifiedError;

    const updateData = {
      emailVerifiedAt: new Date(),
      pendingEmail: null,
      ...(!emailVerified ? { emailVerified: true } : { email: pendingEmail }),
    };
    return usersService.update(id, updateData);
  };

  public login = async ({ email, password }: Login) => {
    const user = await usersService.readByEmailWithPassword(email);

    await validatePassword(password, user.password);

    const payload = { userId: user.id };
    const accessToken = this.signAccessToken(payload);
    const refreshToken = this.signRefreshToken(payload);
    return { accessToken, refreshToken };
  };

  private verifyEmailToken = (token: string) =>
    jwt.verify(token, JWT_VERIFY_EMAIL_SECRET) as JwtPayload;

  private signAccessToken = (payload: JwtPayload) =>
    jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });

  private signRefreshToken = (payload: JwtPayload) =>
    jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

export const authService = new AuthService();
