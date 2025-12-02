import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string().min(2, "Subject name must be at least 2 characters"),
  code: z.string().optional(),
  level: z.string().optional(),
  category: z.string().optional(),
});
