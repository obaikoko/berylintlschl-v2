"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSubjectSchema } from "@/validators/resultValidator";
import { AddSubjectForm } from "@/schemas/resultSchema";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { levels, sessions, showZodErrors, terms } from "@/lib/utils";
import { useAddSubjectMutation } from "@/src/features/results/resultApiSlice";
import { useGetSubjectsQuery } from "@/src/features/subjects/subjectsApiSlice";
import { SubjectSchema } from "@/schemas/subjectSchema";

const AddSubjectToResult = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddSubjectForm>({
    resolver: zodResolver(addSubjectSchema),
  });

  const [addSubject, { isLoading }] = useAddSubjectMutation();

  const {
    data: subjects = [],
    isLoading: loadingSubjects,
    
  } = useGetSubjectsQuery({});

  const onSubmit = async (data: AddSubjectForm) => {
    try {
      await addSubject({
        session: data.session,
        level: data.level,
        term: data.term,
        subjectName: data.subjectName,
      }).unwrap();

      toast.success(`${data.subjectName} added successfully`);
      reset();
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Session */}
        <div>
          <select
            className="bg-background text-foreground"
            {...register("session")}
            defaultValue=""
          >
            <option value="">Select Session</option>
            {sessions.map((session) => (
              <option key={session} value={session}>
                {session}
              </option>
            ))}
          </select>
          {errors.session && (
            <p className="text-red-500 text-sm">{errors.session.message}</p>
          )}
        </div>

        {/* Term */}
        <div>
          <select
            className="bg-background text-foreground"
            {...register("term")}
            defaultValue=""
          >
            <option value="">Select Term</option>
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
          {errors.term && (
            <p className="text-red-500 text-sm">{errors.term.message}</p>
          )}
        </div>

        {/* Level */}
        <div>
          <select
            className="bg-background text-foreground"
            {...register("level")}
            defaultValue=""
          >
            <option value="">Select Level</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className="text-red-500 text-sm">{errors.level.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <select
            className="bg-background text-foreground"
            {...register("subjectName")}
            disabled={loadingSubjects}
            defaultValue=""
          >
            <option value="">
              {loadingSubjects ? "Loading subjects..." : "Select Subject"}
            </option>

            {subjects.map((subject: SubjectSchema) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>

          {errors.subjectName && (
            <p className="text-red-500 text-sm">{errors.subjectName.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Add Subject to Results"}
      </Button>
    </form>
  );
};

export default AddSubjectToResult;
