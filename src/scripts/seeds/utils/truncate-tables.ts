import { db } from '@/lib/drizzle/db';

const SELECT_TABLES_QUERY = `
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public';
`;

export const truncateTables = async () => {
  const { rows } = await db.execute<{ table_name: string }>(
    SELECT_TABLES_QUERY,
  );

  // Check if tables contain data
  if (!rows.length) {
    console.log('No tables to truncate');
    return;
  }

  // Prepare queries
  const joinedTableNames = rows.map(({ table_name }) => table_name).join(', ');
  const truncateTablesQuery = `
    TRUNCATE TABLE ${joinedTableNames}
    RESTART IDENTITY
    CASCADE;
  `;

  // Truncate tables
  await db.execute(truncateTablesQuery);
  console.log(`${joinedTableNames} tables truncated successfully`);
};
