import { z } from 'zod';
import {  staffFormSchema } from '@/validators/staffValidator';

export type RegisterStaffSchema = z.infer<typeof staffFormSchema>;
export type StaffFormData = z.infer<typeof staffFormSchema>;
export type StaffSchema = z.infer<typeof staffFormSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
