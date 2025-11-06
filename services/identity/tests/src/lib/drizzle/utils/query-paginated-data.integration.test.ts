import { db } from '@/lib/drizzle/db';
import { UserInsert, usersTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { faker } from '@faker-js/faker';
import { setupTransactionalDb } from '@tests/utils/setup-transactional-db';
import { ilike } from 'drizzle-orm';

// ---------------------------
// UTILS
// ---------------------------

const createMockUsers = (count: number) =>
  faker.helpers
    .uniqueArray(() => faker.internet.email(), count)
    .map((email): UserInsert => ({ email, password: 'x' }));

// ---------------------------
// TESTS
// ---------------------------

describe('queryPaginatedData', () => {
  setupTransactionalDb();

  beforeEach(async () => {
    await db.delete(usersTable);
  });

  it('returns empty data when no rows match', async () => {
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

  it('paginates correctly', async () => {
    const total = 13;
    const limit = 5;
    const expectations = [
      { page: 1, prevPage: null, nextPage: 2, offset: 0, length: 5 },
      { page: 2, prevPage: 1, nextPage: 3, offset: 5, length: 5 },
      { page: 3, prevPage: 2, nextPage: null, offset: 10, length: 3 },
    ];

    await db.insert(usersTable).values(createMockUsers(total));

    for (const { page, prevPage, nextPage, offset, length } of expectations) {
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
        data: expect.any(Array) as unknown,
      });
      expect(result.data).toHaveLength(length);
    }
  });

  it('filters total and data', async () => {
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

  it('sorts data and skips nonexistent columns', async () => {
    await db.insert(usersTable).values([
      { email: 'c@test.com', password: 'a' },
      { email: 'b@test.com', password: 'a' },
      { email: 'a@test.com', password: 'b' },
    ]);

    const { data } = await queryPaginatedData({
      table: usersTable,
      sort: ['-password', 'email', 'nonexistent'],
    });

    expect(data.map((r) => [r.email, r.password])).toEqual([
      ['a@test.com', 'b'],
      ['b@test.com', 'a'],
      ['c@test.com', 'a'],
    ]);
  });

  it('enforces minimum limit of 1', async () => {
    const result = await queryPaginatedData({ table: usersTable, limit: 0 });

    expect(result.limit).toBe(1);
  });

  it('clamps page to valid range', async () => {
    const cases = [
      { page: 0, expectedPage: 1 },
      { page: 999, expectedPage: 2 },
    ];

    await db.insert(usersTable).values(createMockUsers(11));

    for (const { page, expectedPage } of cases) {
      const result = await queryPaginatedData({ table: usersTable, page });

      expect(result.page).toBe(expectedPage);
    }
  });
});
