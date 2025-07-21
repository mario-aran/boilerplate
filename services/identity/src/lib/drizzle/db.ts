import { DATABASE_URL, NODE_ENV } from '@/config/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schemas from './schemas';

const pool = new Pool({ connectionString: DATABASE_URL });

// Database connection
export const db = drizzle({
  client: pool, // DB connection with driver
  logger: NODE_ENV !== 'production',
  schema: schemas, // Enable usage of "drizzle.query" with all schemas
});
