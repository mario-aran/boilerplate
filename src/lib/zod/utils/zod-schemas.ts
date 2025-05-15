import { z } from '@/lib/zod';
import { uuid } from './zod-fields';

export const idParamsSchema = z.object({ id: uuid });
