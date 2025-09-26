import { db } from '@/lib/drizzle/db';
import { UserInsert, usersTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { faker } from '@faker-js/faker';
import { withTransactionalDb } from '@tests/utils/with-transactional-db';
import { ilike } from 'drizzle-orm';

// ===========================
// UTILS
// ===========================

const createMockUsers = (count: number) =>
  faker.helpers
    .uniqueArray(faker.internet.email, count)
    .map((email): UserInsert => ({ email, password: 'x' }));

describe('queryPaginatedData', () => {
  withTransactionalDb();

  it('returns empty data when no rows match', async () => {
    // Prepare db
    await db.delete(usersTable);

    const result = await queryPaginatedData({ table: usersTable });

    expect(result).toEqual({
      total: 0,
      limit: 10,
      totalPages: 1,
      page: 1,
      prevPage: null,
      nextPage: null,
      offset: 0,
      data: [],
    });
  });

  it('paginates correctly across pages', async () => {
    const total = 13;
    const limit = 5;
    const testCases = [
      { page: 1, prevPage: null, nextPage: 2, offset: 0 },
      { page: 2, prevPage: 1, nextPage: 3, offset: 5 },
      { page: 3, prevPage: 2, nextPage: null, offset: 10 },
    ];

    // Prepare db
    await db.delete(usersTable);
    await db.insert(usersTable).values(createMockUsers(total));

    for (const { page, prevPage, nextPage, offset } of testCases) {
      const result = await queryPaginatedData({
        table: usersTable,
        limit,
        page,
      });

      expect(result).toEqual({
        total,
        limit,
        totalPages: 3,
        page,
        prevPage,
        nextPage,
        offset,
        data: expect.arrayContaining(expect.any(Object)),
      });
      expect(result.data).toHaveLength(total - offset);
    }
  });

  it('filters total and data', async () => {
    // Prepare db
    await db.delete(usersTable);
    await db.insert(usersTable).values([
      { email: 'other@test.com', password: 'x' },
      { email: 'match@test.com', password: 'x' },
    ]);

    const result = await queryPaginatedData({
      table: usersTable,
      filters: ilike(usersTable.email, 'match@test.com'),
    });

    expect(result.total).toBe(1);
    expect(result.data).toHaveLength(1);
  });

  it('sorts data in correct order and skips nonexistent columns', async () => {
    // Prepare db
    await db.delete(usersTable);
    await db.insert(usersTable).values([
      { email: 'c@test.com', password: 'a' },
      { email: 'b@test.com', password: 'a' },
      { email: 'a@test.com', password: 'b' },
    ]);

    const { data } = await queryPaginatedData({
      table: usersTable,
      sortArr: ['-password', 'email', 'nonexistent'],
    });

    expect(data.map((r) => [r.email, r.password])).toEqual([
      ['a@test.com', 'b'],
      ['b@test.com', 'a'],
      ['c@test.com', 'a'],
    ]);
  });
});
