"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

import { useDeleteSubjectsMutation } from "@/src/features/subjects/subjectsApiSlice";
import { SubjectSchema } from "@/schemas/subjectSchema";
import { showZodErrors } from "@/lib/utils";

export function DeleteSubjectDialog({ subject }: { subject: SubjectSchema }) {
  const [open, setOpen] = useState(false);
  const [deleteSubject, { isLoading }] = useDeleteSubjectsMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteSubject(subject.id).unwrap();
      toast.success(res);

      // ✅ Close dialog ONLY on success
      setOpen(false);
    } catch (error) {
      showZodErrors(error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Subject</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <b>{subject.name}</b>? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>

          {/* 👇 prevent auto-close */}
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
