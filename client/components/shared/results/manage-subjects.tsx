import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useManageStudentSubjectsMutation,
  useGetResultQuery,
} from "@/src/features/results/resultApiSlice";
import { showZodErrors } from "@/lib/utils";
import { toast } from "sonner";
import { useGetSubjectsQuery } from "@/src/features/subjects/subjectsApiSlice";
import { SubjectSchema } from "@/schemas/subjectSchema";

const ManageSubjects = ({ resultId }: { resultId: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [addSubject, { isLoading }] = useManageStudentSubjectsMutation();
  const { data, refetch } = useGetResultQuery(resultId);
  const {
    data: subjects = [],
    isLoading: loadingSubjects,
  } = useGetSubjectsQuery({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSubject) {
      toast.error("Subject required");
      return;
    }

    try {
      const res = await addSubject({
        subjectName: selectedSubject, // ✅ Match backend
        resultId,
        selectedAction,
      }).unwrap();

      toast.success(res || "Subject added successfully");
      refetch();
      setDialogOpen(false);
      setSelectedSubject("");
    } catch (error) {
      showZodErrors(error);
    }

    console.log("Selected subject:", selectedSubject);
  };

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>Manage Subjects</Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Subjects</DialogTitle>
            <DialogDescription>
              Select a subject to add or remove an existing one.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4">
            <label
              htmlFor="addOrRemove"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Add/Remove
            </label>

            <select
              id="addOrRemove"
              name="addOrRemove"
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full mt-1 rounded-md border border-gray-300 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="" disabled>
                Add or Remove
              </option>
              <option value="add">Add</option>
              <option value="remove">Remove</option>
            </select>
            <label
              htmlFor="addSubject"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Select Subject
            </label>

            <select
              id="addSubject"
              name="addSubject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full mt-1 rounded-md border border-gray-300 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">
                {loadingSubjects ? "Loading subjects..." : "Select Subject"}
              </option>
              {selectedAction === "add"
                ? subjects.map((subject: SubjectSchema) => (
                    <option key={subject.id} value={subject.name}>
                      {subject.name}
                    </option>
                  ))
                : data?.subjectResults.map((sr, index) => (
                    <option key={index} value={sr.subject}>
                      {sr.subject}
                    </option>
                  ))}
            </select>

            <Button
              type="submit"
              variant="outline"
              className="my-3 w-full"
              disabled={isLoading}
            >
              {isLoading ? "processing..." : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageSubjects;
