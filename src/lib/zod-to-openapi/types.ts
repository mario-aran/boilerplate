import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export interface RegisterPathsProps {
  registry: OpenAPIRegistry;
  security: Record<string, string[]>[];
}
