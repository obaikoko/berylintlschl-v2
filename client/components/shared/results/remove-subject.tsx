'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { removeSubjectSchema } from '@/validators/resultValidator';
import { RemoveSubjectForm } from '@/schemas/resultSchema';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { levels, sessions, showZodErrors, terms } from '@/lib/utils';
import { useRemoveSubjectMutation } from '@/src/features/results/resultApiSlice';
import { useGetSubjectsQuery } from "@/src/features/subjects/subjectsApiSlice";
import { SubjectSchema } from "@/schemas/subjectSchema";

const RemoveSubjectFromResult = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RemoveSubjectForm>({
    resolver: zodResolver(removeSubjectSchema),
  });

  const [removeSubject, { isLoading }] = useRemoveSubjectMutation();
   const {
      data: subjects = [],
      isLoading: loadingSubjects,
    } = useGetSubjectsQuery({});

  const onSubmit = async (data: RemoveSubjectForm) => {
    try {
      await removeSubject({
        session: data.session,
        level: data.level,
        term: data.term,
        subjectName: data.subjectName,
      }).unwrap();
      toast.success(`${data.subjectName} removed successfully`);
      reset();
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="session">Session</Label>
          <select
            className="bg-background text-foreground"
            {...register("session")}
            defaultValue=""
          >
            <option value="">Select Session</option>

            {sessions.map((session, index) => (
              <option key={index} value={session}>
                {session}
              </option>
            ))}
          </select>

          {errors.session && (
            <p className="text-red-500 text-sm mt-1">
              {errors.session.message}
            </p>
          )}
        </div>

        <div>
          <select
            className="bg-background text-foreground"
            {...register("term")}
          >
            <option value="">Select Term</option>

            {terms.map((term, index) => (
              <option key={index} value={term}>
                {term}
              </option>
            ))}
          </select>
          {errors.term && (
            <p className="text-red-500 text-sm mt-1">{errors.term.message}</p>
          )}
        </div>

        <div>
          <option value="">Select Level/Class</option>
          <select
            className="bg-background text-foreground"
            {...register("level")}
          >
            {levels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>
          )}
        </div>

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
        {isLoading ? "Processing..." : "Remove Subject from Results"}
      </Button>
    </form>
  );
};

export default RemoveSubjectFromResult;
