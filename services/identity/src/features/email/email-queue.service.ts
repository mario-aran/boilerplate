import { QUEUES } from '@/constants/queues';
import { queueOptions } from '@/lib/redis/bullmq/queue-options';
import { Queue } from 'bullmq';
import { EmailPayload } from './types';

class EmailQueueService {
  private static readonly emailVerificationEmailQueue = new Queue(
    QUEUES.EMAIL_VERIFICATION_EMAIL,
    queueOptions,
  );

  private static readonly passwordResetEmailQueue = new Queue(
    QUEUES.PASSWORD_RESET_EMAIL,
    queueOptions,
  );

  async queueEmailVerification(payload: EmailPayload) {
    await EmailQueueService.emailVerificationEmailQueue.add(
      QUEUES.EMAIL_VERIFICATION_EMAIL,
      payload,
    );
  }

  async queuePasswordReset(payload: EmailPayload) {
    await EmailQueueService.passwordResetEmailQueue.add(
      QUEUES.PASSWORD_RESET_EMAIL,
      payload,
    );
  }
}

export const emailQueueService = new EmailQueueService();
