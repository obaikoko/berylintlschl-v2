import { mailSchema } from '@/validators/mailValidator';
import { z } from 'zod';

export type MailFormSchema = z.infer<typeof mailSchema>;
