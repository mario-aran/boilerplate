import { PORT } from '@/config/env';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
  servers: [
    { url: `http://localhost:${PORT}/api`, description: 'development' },
  ],
  paths: {},
};
