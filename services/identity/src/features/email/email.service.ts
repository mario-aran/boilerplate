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

// Types
interface SendEmailVerificationProps {
  email: string;
  token: string;
}

class EmailService {
  private transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  public sendEmailVerification = async ({
    email,
    token,
  }: SendEmailVerificationProps) => {
    const tokenUrl = `${BASE_URL}${ROUTES.AUTH_VERIFY_EMAIL}?token=${token}`;
    await this.transporter.sendMail({
      from: VERIFY_EMAIL_FROM,
      to: email,
      subject: 'Verify your email address',
      text: `Please verify your email by visiting this URL: ${tokenUrl}`,
    });
  };
}

export const emailService = new EmailService();
