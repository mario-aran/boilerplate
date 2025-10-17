import { QUEUES } from '@/constants/queues';
import { emailService } from '@/features/email/email.service';
import { createWorker } from './utils';

export const verificationEmailWorker = () =>
  createWorker({
    name: QUEUES.VERIFICATION_EMAIL,
    processor: (job) => emailService.sendVerificationEmail(job.data),
  });
