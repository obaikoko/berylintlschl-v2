import { z } from 'zod';

export const staffFormSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 letters'),
  lastName: z.string().min(3, 'Last name must be at least 3 letters'),
  otherName: z.string().optional().nullable(),
  dateOfBirth: z.coerce.date({ message: 'Invalid date of birth' }),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, 'Invalid phone number')
    .optional()
    .nullable(),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role must be at least 3 characters'),
  qualification: z.string().min(1, 'Qualification cannot be empty'),
  yearAdmitted: z.coerce.date({ message: 'Invalid admission year' }),
  gender: z.string().min(1, 'Gender is required'),
  maritalStatus: z.string().min(1, 'Marital status required'),
  category: z.string().min(1, 'Category cannot be empty'),
  stateOfOrigin: z.string().min(1, 'State of origin is required'),
  localGvt: z.string().min(1, 'Local government is required'),
  homeTown: z.string().min(1, 'Hometown is required').optional().nullable(),
  residence: z.string().min(3, 'Residence must be at least 3 characters'),
  imageUrl: z.string().optional().nullable(),
});
