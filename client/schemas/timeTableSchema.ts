import { z } from 'zod';
import { createTimeTableSchema } from '@/validators/timeTableValidator';

export type TimeTableFormValues = z.infer<typeof createTimeTableSchema>
export type TimeTableSchema = z.infer<typeof createTimeTableSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
