// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import { app } from './app';
import { PORT } from './config/env';

// Start the server
app
  .listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  })
  .on('error', (error) => {
    console.error(`Server failed to start: ${error}`);
    process.exit(1);
  });
