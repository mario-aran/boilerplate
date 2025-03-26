// WARNING: This file is executed by a "package.json" script. Don't rename or move it

import { SERVER_PORT } from '@/config/env';
import express from 'express';
import { router } from './router';

const app = express();

// Set the router
app.use('/api', router);

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port: ${SERVER_PORT}`);
});
