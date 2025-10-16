import { QUEUES } from '@/constants/queues';
import { queueOptions } from '@/lib/redis/bullmq/queue-options';
import { Queue } from 'bullmq';
import { VerificationEmailProps } from './types';

class EmailQueueService {
  private static readonly verificationQueue = new Queue(
    QUEUES.VERIFICATION_EMAIL,
    queueOptions,
  );

  async queueVerification(props: VerificationEmailProps) {
    await EmailQueueService.verificationQueue.add(
      QUEUES.VERIFICATION_EMAIL,
      props,
    );
  }
}

export const emailQueueService = new EmailQueueService();
