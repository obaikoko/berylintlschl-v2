import { z } from 'zod';
import { createAnnouncementSchema } from '@/validators/announcementValidation';

export type AnnouncementFormSchema = z.infer<typeof createAnnouncementSchema>;

export type AnnouncementSchema = AnnouncementFormSchema & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
