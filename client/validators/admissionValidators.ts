import {z} from 'zod'

export const admissionForm = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
  .string()
  .regex(/^\d{10,15}$/, 'Invalid phone number')
  .optional()
  .nullable(),
  childName: z.string().min(3, 'Child`s full name required'),
  dateOfBirth: z.coerce.date({ message: 'Invalid date of birth' }),
  gender: z.string().min(3, 'Gender must be at least 3 characters'),
  level: z.string().min(3, 'Select must be at least 3 characters'),
});