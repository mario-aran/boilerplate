import { db, Tx } from '@/lib/drizzle';
import { TransactionRollbackError } from 'drizzle-orm';

export const transactionWithRollback = async (
  fn: (tx: Tx) => Promise<void>,
) => {
  await db
    .transaction(async (tx) => {
      await fn(tx);

      tx.rollback();
    })
    .catch((err) => {
      // Catch the rollback to not fail the test
      if (!(err instanceof TransactionRollbackError)) throw err;
    });
};
