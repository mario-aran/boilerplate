import { QUEUES } from '@/constants/queues';
import { emailService } from '@/features/email/email.service';
import { EmailPayload } from '@/features/email/types';
import { Job } from 'bullmq';
import { createWorker } from './utils';

export const verificationEmailWorker = () =>
  createWorker({
    name: QUEUES.EMAIL_VERIFICATION_EMAIL,
    processor: (job: Job<EmailPayload>) =>
      emailService.sendEmailVerification(job.data),
  });
