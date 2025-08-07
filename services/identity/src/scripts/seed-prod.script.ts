// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import { scriptCatchAsync } from './utils/script-catch-async';
import { seedSystemData } from './utils/seeds/seed-system-data';

// Run the script
(async () => {
  await scriptCatchAsync(seedSystemData);
})();
