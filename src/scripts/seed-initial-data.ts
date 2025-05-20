import { authSeeder } from './utils/auth-seeder';
import { runtScriptWithCatch } from './utils/run-script-with-catch';

// Utils
const runScript = async () => {
  await authSeeder.runSeeds();
};

// Run the script
(async () =>
  await runtScriptWithCatch({ processName: 'Seeding', asyncFn: runScript }))();
