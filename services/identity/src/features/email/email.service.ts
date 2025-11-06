import {
  CLIENT_URL,
  EMAIL_FROM,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
} from '@/config/env';
import { PATHS } from '@/constants/paths';
import {
  signEmailVerificationToken,
  signPasswordResetToken,
} from '@/lib/jwt/token-utils';
import nodemailer from 'nodemailer';
import { EmailPayload } from './types';

class EmailService {
  private static readonly transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth:
      SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined, // "auth" only required in production
  });

  async sendEmailVerification({ userId, email }: EmailPayload) {
    const token = signEmailVerificationToken({ userId });
    const link = this.buildTokenLink(PATHS.AUTH_VERIFY_EMAIL, token);

    await EmailService.transporter.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: 'Email verification',
      text: `Access this link to verify your email: ${link}`,
    });
  }

  async sendPasswordReset({ userId, email }: EmailPayload) {
    const token = signPasswordResetToken({ userId });
    const link = this.buildTokenLink(PATHS.AUTH_RESET_PASSWORD, token);

    await EmailService.transporter.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: 'Password reset',
      text: `Access this link to reset your password: ${link}`,
    });
  }

  private buildTokenLink(path: string, token: string) {
    return `${CLIENT_URL}${path}?token=${token}`;
  }
}

export const emailService = new EmailService();
