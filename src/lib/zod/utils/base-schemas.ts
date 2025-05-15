import { z } from '@/lib/zod';
import { uuid } from './base-fields';

export const idSchema = z.object({ id: uuid });
