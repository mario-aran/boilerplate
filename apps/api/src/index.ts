// WARNING: This file is used by a script in "package.json". Do not rename or move

// Never use dotenv in production
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('dotenv').config(); // Used "require()" because "import()" uses async
}

import { SERVER_PORT } from '@/config/env';
import { app } from './app';

// Start the server
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server running on port: ${SERVER_PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
