import { QUEUES } from '@/constants/queues';
import { queueOptions } from '@/lib/redis/bullmq/queue-options';
import { Queue } from 'bullmq';
import { EmailPayload } from './types';

class EmailQueueService {
  private static readonly verificationEmailQueue = new Queue(
    QUEUES.VERIFICATION_EMAIL,
    queueOptions,
  );

  private static readonly resetPasswordEmailQueue = new Queue(
    QUEUES.PASSWORD_RESET_EMAIL,
    queueOptions,
  );

  async queueVerificationEmail(payload: EmailPayload) {
    await EmailQueueService.verificationEmailQueue.add(
      QUEUES.VERIFICATION_EMAIL,
      payload,
    );
  }

  async queueResetPasswordEmail(payload: EmailPayload) {
    await EmailQueueService.resetPasswordEmailQueue.add(
      QUEUES.PASSWORD_RESET_EMAIL,
      payload,
    );
  }
}

export const emailQueueService = new EmailQueueService();
