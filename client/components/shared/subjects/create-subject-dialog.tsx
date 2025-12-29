"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSubjectMutation } from "@/src/features/subjects/subjectsApiSlice";
import { subjectSchema } from "@/validators/subjectValidators";
import { SubjectFormValues } from "@/schemas/subjectSchema";
import { showZodErrors } from "@/lib/utils";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function CreateSubjectDialog() {
  const [open, setOpen] = useState(false);

  const [createSubject, { isLoading }] = useCreateSubjectMutation();

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
  });

  const onSubmit = async (values: SubjectFormValues) => {
    try {
      await createSubject(values).unwrap();

      toast.success(`${values.name} has been added successfully`);

      form.reset();
      setOpen(false); 
    } catch (error) {
      showZodErrors(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Subject</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Subject</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Subject Name */}
          <div className="space-y-1">
            <Label>Subject Name</Label>
            <Input disabled={isLoading} {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Subject Code */}
          <div className="space-y-1">
            <Label>Subject Code (Optional)</Label>
            <Input disabled={isLoading} {...form.register("code")} />
          </div>

          {/* Level */}
          <div className="space-y-1">
            <Label>Level (Optional)</Label>
            <Input disabled={isLoading} {...form.register("level")} />
          </div>

          {/* Category */}
          <div className="space-y-1">
            <Label>Category (Optional)</Label>
            <Input disabled={isLoading} {...form.register("category")} />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
