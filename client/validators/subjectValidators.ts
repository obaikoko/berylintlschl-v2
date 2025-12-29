import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string().min(3, "subject name must be at least 3 characters"),
  code: z.string().optional(),
  level: z.string().optional(),
  category: z.string().optional(),
});
