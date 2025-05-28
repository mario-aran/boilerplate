import { SERVER_PORT } from '@/config/env';

// Types
interface GenerateDocumentProps {
  version: string;
  paths: Record<string, unknown>;
}

// Constants
const SECURITY_SCHEME = 'bearerAuth';
export const SECURITY = [{ [SECURITY_SCHEME]: [] }] as const;

// Utils
export const generateDocument = ({
  version,
  paths,
}: GenerateDocumentProps) => ({
  // Base
  openapi: '3.1.0',
  info: {
    title: 'My API',
    description: `API documentation for version ${version}`,
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${SERVER_PORT}/api/${version}`,
      description: 'development',
    },
  ],

  // Auth
  components: {
    securitySchemes: {
      [SECURITY_SCHEME]: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },

  // Paths
  paths,
});
