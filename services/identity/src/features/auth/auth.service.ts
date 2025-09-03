import { EmailQueueService } from '@/features/email/email-queue.service';
import { UsersService } from '@/features/users/users.service';
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
interface AuthServiceProps {
  usersService: UsersService;
  emailQueueService: EmailQueueService;
}

interface SignAndQueueEmailVerificationProps {
  userId: string;
  email: string;
}

interface ThrowIfEmailVerifiedProps {
  emailVerified: boolean;
  pendingEmail: string | null;
}

export class AuthService {
  private readonly usersService: UsersService;
  private readonly emailQueueService: EmailQueueService;

  constructor({ usersService, emailQueueService }: AuthServiceProps) {
    this.usersService = usersService;
    this.emailQueueService = emailQueueService;
  }

  async verifyEmail({ token }: VerifyEmailAuth) {
    const { userId } = validateEmailVerificationToken(token);

    const user = await this.usersService.get(userId);
    this.throwIfEmailVerified({
      emailVerified: user.emailVerified,
      pendingEmail: user.pendingEmail,
    });

    const { email } = await this.usersService.update(user.id, {
      emailVerifiedAt: new Date(),
      emailVerified: !user.emailVerified ? true : undefined,
      email: user.pendingEmail || undefined,
      pendingEmail: null,
    });
    return { email };
  }

  async register(props: RegisterAuth) {
    const { id, email } = await this.usersService.create(props);

    await this.signAndQueueEmailVerification({ userId: id, email });

    return { email };
  }

  async resendEmailVerification({ currentEmail }: ResendEmailVerificationAuth) {
    const user = await this.usersService.getByEmailWithPassword(currentEmail);
    this.throwIfEmailVerified({
      emailVerified: user.emailVerified,
      pendingEmail: user.pendingEmail,
    });

    const email = user.pendingEmail || user.email;
    await this.signAndQueueEmailVerification({ userId: user.id, email });

    return { email };
  }

  async login({ email, password }: LoginAuth) {
    const user = await this.usersService.getByEmailWithPassword(email);

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
    await this.emailQueueService.queueEmailVerification({ email, token });
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
