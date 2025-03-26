// "drizzle": Copied from https://orm.drizzle.team/docs/get-started/postgresql-new#step-3---connect-drizzle-orm-to-the-database

import { DATABASE_URL, NODE_ENV } from '@/config/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schemas from './schemas';

const pool = new Pool({ connectionString: DATABASE_URL });

// Drizzle database connection
export const db = drizzle({
  client: pool, // DB connection with driver
  logger: NODE_ENV !== 'production' && true, // Query logging
  schema: schemas, // Enable the use of "drizzle.query" on all schemas
});
