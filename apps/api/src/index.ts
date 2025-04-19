// WARNING: This file is used by a script in "package.json". Do not rename or move

import '@/config/load-env';
import { app } from './app';
import { SERVER_PORT } from './config/env';

// Start the server
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server running on port: ${SERVER_PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
