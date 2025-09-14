import { db, Tx } from '@/lib/drizzle';
import { TransactionRollbackError } from 'drizzle-orm';

export const transactionWithRollback = async (
  fn: (tx: Tx) => Promise<void>,
) => {
  await db
    .transaction(async (tx) => {
      await fn(tx);

      // Force rollback by throwing a transaction error
      throw new TransactionRollbackError();
    })
    .catch((err) => {
      // Catch the forced transaction error so it doesn't fail the test
      if (!(err instanceof TransactionRollbackError)) throw err;
    });
};
