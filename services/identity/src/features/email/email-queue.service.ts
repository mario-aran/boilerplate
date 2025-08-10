import { QUEUES } from '@/constants/queues';
import { bullMQConnection } from '@/lib/redis/bullmq-connection';
import { Queue } from 'bullmq';
import { EmailVerificationProps } from './types';

class EmailQueueService {
  private emailVerificationQueue = new Queue(QUEUES.EMAIL_VERIFICATION, {
    connection: bullMQConnection.connection,
  });

  async enqueueEmailVerification(props: EmailVerificationProps) {
    await this.emailVerificationQueue.add(QUEUES.EMAIL_VERIFICATION, props);
  }
}

export const emailQueueService = new EmailQueueService();
