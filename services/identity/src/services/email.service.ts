import {
  BASE_URL,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
  VERIFY_EMAIL_FROM,
} from '@/config/env';
import { SEGMENTS } from '@/constants/routes';
import nodemailer from 'nodemailer';

// Types
interface SendVerificationEmailProps {
  email: string;
  emailToken: string;
}

class EmailService {
  private transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  public sendVerificationEmail = async ({
    email,
    emailToken,
  }: SendVerificationEmailProps) => {
    const verifyEmailUrl = `${BASE_URL}${SEGMENTS.VERIFY_EMAIL}/${emailToken}`;

    await this.transporter.sendMail({
      from: VERIFY_EMAIL_FROM,
      to: email,
      subject: 'Verify your email address',
      text: `Please verify your email by visiting this URL: ${verifyEmailUrl}`,
    });
  };
}

export const emailService = new EmailService();
