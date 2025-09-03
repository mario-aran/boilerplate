import { QUEUES } from '@/constants/queues';
import { bullMQConnection } from '@/lib/redis/bullmq-connection';
import { Queue } from 'bullmq';
import { EmailVerificationProps } from './types';

class EmailQueueService {
  private static readonly verificationQueue = new Queue(
    QUEUES.EMAIL_VERIFICATION,
    { connection: bullMQConnection.connection },
  );

  async queueVerification(props: EmailVerificationProps) {
    await EmailQueueService.verificationQueue.add(
      QUEUES.EMAIL_VERIFICATION,
      props,
    );
  }
}

export const emailQueueService = new EmailQueueService();
