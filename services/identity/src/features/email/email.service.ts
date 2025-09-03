import {
  BASE_URL,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
  VERIFY_EMAIL_FROM,
} from '@/config/env';
import { PATHS } from '@/constants/paths';
import nodemailer from 'nodemailer';
import { EmailVerificationProps } from './types';

class EmailService {
  private static readonly transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  async sendVerification({ email, token }: EmailVerificationProps) {
    const tokenUrl = `${BASE_URL}${PATHS.AUTH_VERIFY_EMAIL}?token=${token}`;

    await EmailService.transporter.sendMail({
      from: VERIFY_EMAIL_FROM,
      to: email,
      subject: 'Verify your email',
      text: `Please verify your email address by visiting: ${tokenUrl}`,
    });
  }
}

export const emailService = new EmailService();
