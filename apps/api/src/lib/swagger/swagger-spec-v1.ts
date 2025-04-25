import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpecV1 = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Docs - V1',
      version: '1.0.0',
    },
  },
  apis: ['./src/router/**/*.ts'], // Path to JSDoc annotations
});
