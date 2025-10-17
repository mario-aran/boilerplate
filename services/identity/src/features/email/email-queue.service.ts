import { QUEUES } from '@/constants/queues';
import { queueOptions } from '@/lib/redis/bullmq/queue-options';
import { Queue } from 'bullmq';
import { VerificationEmailPayload } from './types';

class EmailQueueService {
  private static readonly verificationEmailQueue = new Queue(
    QUEUES.VERIFICATION_EMAIL,
    queueOptions,
  );

  async queueVerificationEmail(payload: VerificationEmailPayload) {
    await EmailQueueService.verificationEmailQueue.add(
      QUEUES.VERIFICATION_EMAIL,
      payload,
    );
  }
}

export const emailQueueService = new EmailQueueService();
