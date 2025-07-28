import {
  BASE_URL,
  JWT_VERIFY_EMAIL_SECRET,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
  VERIFY_EMAIL_FROM,
} from '@/config/env';
import { SEGMENTS } from '@/constants/routes';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

class EmailService {
  private transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  public sendVerificationEmail = async (userId: string, email: string) => {
    const token = jwt.sign({ userId }, JWT_VERIFY_EMAIL_SECRET, {
      expiresIn: '1d',
    });

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
