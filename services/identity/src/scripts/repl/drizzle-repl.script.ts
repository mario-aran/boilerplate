// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { NODE_ENV } from '@/config/env';
import { db } from '@/lib/drizzle/db-connection';
import * as schemas from '@/lib/drizzle/schemas';
import * as orm from 'drizzle-orm';
import repl from 'node:repl';

// Guards
if (NODE_ENV === 'production')
  throw new Error('Script not allowed in production');

// Start REPL
const replServer = repl.start();

// Expose values to REPL context
replServer.context.db = db; // Load drizzle instance
replServer.context.schemas = schemas; // Load drizzle schemas
replServer.context.orm = orm; // Load drizzle orm
