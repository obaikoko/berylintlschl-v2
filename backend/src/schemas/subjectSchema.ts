import { z } from "zod";
import { subjectSchema } from "../validators/subjectValidator";

export type Subjects = z.infer<typeof subjectSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
