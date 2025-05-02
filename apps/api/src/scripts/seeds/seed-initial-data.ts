import { authSeeder } from './utils/auth-seeder';

(async () => {
  try {
    await authSeeder.runSeeds();

    console.log('Database seeded successfully');
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`Seeding error: ${errorMessage}`);
  }
})();
