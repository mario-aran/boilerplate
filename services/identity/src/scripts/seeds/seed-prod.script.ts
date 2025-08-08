// DO NOT RENAME OR MOVE THIS FILE — used by "package.json"

import { scriptCatchAsync } from '@/scripts/utils/script-catch-async';
import { seedSystemData } from './utils/seed-system-data';

// Run the script
(async () => {
  await scriptCatchAsync(seedSystemData);
})();
