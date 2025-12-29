import { subjectSchema } from "@/validators/subjectValidators";
import { z } from "zod";

export type SubjectFormValues = z.infer<typeof subjectSchema>;
export type SubjectSchema = z.infer<typeof subjectSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
