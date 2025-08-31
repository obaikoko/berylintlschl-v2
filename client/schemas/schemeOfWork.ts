import { createSchemeSchema } from '@/validators/schemeOfWorkValidator';
import { z } from 'zod';

export type SchemeOfWorkSchema = z.infer<typeof createSchemeSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
