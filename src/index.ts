// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import '@/config/load-dotenv'; // "dotenv": Ensure it's loaded before env imports

import { app } from './app';
import { SERVER_PORT } from './config/env';

// Start the server
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server running on port: ${SERVER_PORT}`);
});

// Server errors
server.on('error', (error) => {
  console.error(`Server failed to start: ${error}`);
  process.exit(1);
});
