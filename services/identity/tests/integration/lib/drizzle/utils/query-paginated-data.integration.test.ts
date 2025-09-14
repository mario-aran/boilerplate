import { UserInsert, usersTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { faker } from '@faker-js/faker';
import { transactionWithRollback } from '@tests/utils/db';

// Types
interface GetExpectedMetadataProps {
  total: number;
  limit: number;
  page: number;
}

// Utils
const createMockUsers = (count: number) =>
  faker.helpers
    .uniqueArray(faker.internet.email, count)
    .map((email): UserInsert => ({ email, password: '1234' }));

const getExpectedMetadata = ({
  total,
  limit,
  page,
}: GetExpectedMetadataProps) => {
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const offset = (safePage - 1) * safeLimit;

  return {
    dataLength: Math.min(safeLimit, total - offset),
    limit: safeLimit,
    page: safePage,
    prevPage: safePage > 1 ? safePage - 1 : null,
    nextPage: safePage < totalPages ? safePage + 1 : null,
    totalPages,
  };
};

describe('queryPaginatedData', () => {
  it('returns empty data with correct base metadata when no results', async () => {
    await transactionWithRollback(async (tx) => {
      // Prepare db
      await tx.delete(usersTable);

      // Test data
      const actual = await queryPaginatedData({
        dbOrTx: tx,
        table: usersTable,
      });

      expect(actual.data).toEqual([]);
      expect(actual.total).toBe(0);
      expect(actual.page).toBe(1);
    });
  });

  it('handles pagination correctly for first, middle, and last pages', async () => {
    const total = 5;
    const mockedUsers = createMockUsers(total);
    const limit = 2;

    await transactionWithRollback(async (tx) => {
      // Prepare db
      await tx.delete(usersTable);
      await tx.insert(usersTable).values(mockedUsers);

      // Test data
      for (const page of [1, 2, 3]) {
        const actual = await queryPaginatedData({
          dbOrTx: tx,
          table: usersTable,
          limit,
          page,
        });
        const expected = getExpectedMetadata({ total, limit, page });

        expect(actual.data).toHaveLength(expected.dataLength);
        expect(actual.total).toBe(total);
        expect(actual.limit).toBe(expected.limit);
        expect(actual.page).toBe(expected.page);
        expect(actual.prevPage).toBe(expected.prevPage);
        expect(actual.nextPage).toBe(expected.nextPage);
        expect(actual.totalPages).toBe(expected.totalPages);
      }
    });
  });

  it('sorts data by multiple fields correctly', async () => {
    const mockedUsers: UserInsert[] = [
      { email: 'a@test.com', password: 'b.test' },
      { email: 'b@test.com', password: 'a.test' },
      { email: 'c@test.com', password: 'a.test' },
    ];

    await transactionWithRollback(async (tx) => {
      // Prepare db
      await tx.delete(usersTable);
      await tx.insert(usersTable).values(mockedUsers);

      // Test data
      const sortedUsers = await queryPaginatedData({
        dbOrTx: tx,
        table: usersTable,
        sortArr: ['password', '-email'],
      });

      expect(sortedUsers.data.map((u) => [u.email, u.password])).toEqual([
        ['c@test.com', 'a.test'],
        ['b@test.com', 'a.test'],
        ['a@test.com', 'b.test'],
      ]);
    });
  });

  it('sets limit to 1 when passing a non-positive limit', async () => {
    const actual = await queryPaginatedData({ table: usersTable, limit: 0 });

    expect(actual.limit).toBe(1);
  });

  it('clamps out-of-range page to valid page', async () => {
    const total = 2;
    const mockedUsers = createMockUsers(total);
    const limit = 1;

    await transactionWithRollback(async (tx) => {
      // Prepare db
      await tx.delete(usersTable);
      await tx.insert(usersTable).values(mockedUsers);

      // Test data
      for (const page of [0, 999]) {
        const actual = await queryPaginatedData({
          dbOrTx: tx,
          table: usersTable,
          limit,
          page,
        });
        const expected = getExpectedMetadata({ total, limit, page });

        expect(actual.page).toBe(expected.page);
      }
    });
  });
});
