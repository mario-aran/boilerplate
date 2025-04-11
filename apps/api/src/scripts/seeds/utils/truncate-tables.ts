import { db } from '@/lib/drizzle/db';

// Types
type SelectTablesResult = { table_name: string };

// Constants
const SELECT_TABLES_QUERY = `
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public';
`;

export const truncateTables = async () => {
  // Query the database
  const { rows } = await db.execute<SelectTablesResult>(SELECT_TABLES_QUERY);

  if (!rows.length) return console.log('No tables to truncate');

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
