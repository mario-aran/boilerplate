import { z } from 'zod';
import { id } from './common-fields';

// Schemas
export const idZod = z.object({ id });

// Request schemas
export const idReqZod = z.object({ params: idZod });

// Exported schema types
export type IdZod = z.infer<typeof idZod>;
