import { PATHS } from '@/constants/paths';
import { Transporter } from 'nodemailer';
import { EmailVerificationProps } from './types';

// Types
interface EmailServiceProps {
  transporter: Transporter;
  baseUrl: string;
  from: string;
}

export class EmailService {
  private readonly transporter: Transporter;
  private readonly baseUrl: string;
  private readonly from: string;

  constructor({ transporter, baseUrl, from }: EmailServiceProps) {
    this.transporter = transporter;
    this.baseUrl = baseUrl;
    this.from = from;
  }

  async sendEmailVerification({ token, email }: EmailVerificationProps) {
    const tokenUrl = `${this.baseUrl}${PATHS.AUTH_VERIFY_EMAIL}?token=${token}`;

    await this.transporter.sendMail({
      from: this.from,
      to: email,
      subject: 'Verify your email',
      text: `Please verify your email address by visiting: ${tokenUrl}`,
    });
  }
}
