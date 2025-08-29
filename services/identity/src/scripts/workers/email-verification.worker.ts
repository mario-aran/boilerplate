import { QUEUES } from '@/constants/queues';
import { emailService } from '@/features/email/email.service';
import { createWorker } from './utils';

export const emailVerificationWorker = () =>
  createWorker({
    name: QUEUES.EMAIL_VERIFICATION,
    processor: (job) => emailService.sendEmailVerification(job.data),
  });
