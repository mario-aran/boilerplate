import { QUEUES } from '@/constants/queues';
import { bullMQConnection } from '@/lib/redis/bullmq-connection';
import { Queue } from 'bullmq';
import { VerificationEmailProps } from './types';

class EmailQueueService {
  private static readonly verificationQueue = new Queue(
    QUEUES.VERIFICATION_EMAIL,
    { connection: bullMQConnection.connection },
  );

  async queueVerification(props: VerificationEmailProps) {
    await EmailQueueService.verificationQueue.add(
      QUEUES.VERIFICATION_EMAIL,
      props,
    );
  }
}

export const emailQueueService = new EmailQueueService();
