import { z } from '@/lib/zod';
import { uuid } from './zod-fields';

export const idSchema = z.object({ id: uuid });
