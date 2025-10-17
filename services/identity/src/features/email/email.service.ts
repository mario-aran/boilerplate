import {
  API_GATEWAY_URL,
  EMAIL_FROM,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
} from '@/config/env';
import { PATHS } from '@/constants/paths';
import nodemailer from 'nodemailer';
import { VerificationEmailPayload } from './types';

class EmailService {
  private static readonly transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth:
      SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined, // "auth" only required in production
  });

  async sendVerificationEmail({ email, token }: VerificationEmailPayload) {
    const tokenUrl = `${API_GATEWAY_URL}${PATHS.AUTH_VERIFY_EMAIL}?token=${token}`;

    await EmailService.transporter.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: 'Verify your email',
      text: `Please verify your email address by visiting: ${tokenUrl}`,
    });
  }
}

export const emailService = new EmailService();
