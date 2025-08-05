import {
  BASE_URL,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
  VERIFY_EMAIL_FROM,
} from '@/config/env';
import { ROUTES } from '@/constants/routes';
import nodemailer from 'nodemailer';
import { EmailVerificationProps } from './types';

class EmailService {
  private transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  public sendEmailVerification = async ({
    email,
    token,
  }: EmailVerificationProps) => {
    const tokenUrl = `${BASE_URL}${ROUTES.API_AUTH_VERIFY_EMAIL}?token=${token}`;

    await this.transporter.sendMail({
      from: VERIFY_EMAIL_FROM,
      to: email,
      subject: 'Verify your email',
      text: `Please verify your email address by visiting: ${tokenUrl}`,
    });
  };
}

export const emailService = new EmailService();
