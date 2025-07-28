import {
  BASE_URL,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
  VERIFY_EMAIL_FROM,
} from '@/config/env';
import { SEGMENTS } from '@/constants/routes';
import { signVerifyEmailToken } from '@/lib/jwt/utils';
import nodemailer from 'nodemailer';

// Types
interface SendVerificationEmailProps {
  userId: string;
  email: string;
}

class EmailService {
  private transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  public sendVerificationEmail = async ({
    userId,
    email,
  }: SendVerificationEmailProps) => {
    const token = signVerifyEmailToken(userId);

    const tokenUrl = `${BASE_URL}${SEGMENTS.VERIFY_EMAIL}/${token}`;
    await this.transporter.sendMail({
      from: VERIFY_EMAIL_FROM,
      to: email,
      subject: 'Verify your email address',
      text: `Please verify your email by visiting this URL: ${tokenUrl}`,
    });
  };
}

export const emailService = new EmailService();
