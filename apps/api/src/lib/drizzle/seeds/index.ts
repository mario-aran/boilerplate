// WARNING: This file is used by a script in "package.json". Do not rename or move

import { NODE_ENV } from '@/config/env';
import { seedBaseTables } from './seed-base-tables';
import { seedUsers } from './seed-users';
import { truncateTables } from './utils/truncate-tables';

const seedDatabase = async () => {
  try {
    // Reset tables
    await truncateTables();

    // Seed: no requirements
    await seedBaseTables();

    // Seed: requires base tables to be seeded
    await seedUsers();

    console.log('Database seeded successfully');
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`Seeding error: ${errorMessage}`);
  }
};

// Run script only in development
if (NODE_ENV === 'production')
  throw new Error('Seeding not allowed in production');
seedDatabase();
