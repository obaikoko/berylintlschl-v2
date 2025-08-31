import { z } from 'zod';
import { admissionForm } from '@/validators/admissionValidators';

export type AdmissionFormData = z.infer<typeof admissionForm>;

export type AdmissionSchema = AdmissionFormData & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
