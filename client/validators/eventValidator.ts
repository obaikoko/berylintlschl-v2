import { z } from 'zod';

export const eventForm = z.object({
  title: z.string().min(3, 'title cannot be less than 3 characters'),
  description: z
    .string()
    .min(3, 'description cannot be less than 3 characters'),
  date: z.coerce.date(),
  imageUrl: z.string().optional(),
});
export const updateEventForm = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  imageUrl: z.string().optional(),
});
