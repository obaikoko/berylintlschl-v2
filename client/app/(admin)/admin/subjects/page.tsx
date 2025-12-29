"use client";

import {  useState } from "react";
import CreateSubjectDialog from "@/components/shared/subjects/create-subject-dialog";
import { DeleteSubjectDialog } from "@/components/shared/subjects/delete-subject-dialog";
import { useGetSubjectsQuery } from "@/src/features/subjects/subjectsApiSlice";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Loader2 } from "lucide-react";
import { SubjectSchema } from "@/schemas/subjectSchema";
import RemoveSubjectFromResult from "@/components/shared/results/remove-subject";
import AddSubjectToResult from "@/components/shared/results/add-subject-result";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Add Subject",
    description: "Add subject to existing class results",
    icon: BookOpen,
    content: <AddSubjectToResult />,
  },
  {
    title: "Remove Subject",
    description: "Removing subject from existing class results",
    icon: BookOpen,
    content: <RemoveSubjectFromResult />,
  },
];

export default function SubjectsPage() {
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    null | (typeof actions)[0]
  >(null);
  const { data: subjects = [], isLoading } = useGetSubjectsQuery({});

  const handleClick = (action: (typeof actions)[0]) => {
    setSelectedAction(action);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Subjects</h1>
        <CreateSubjectDialog />
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Subjects</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {subjects.length}
          </CardContent>
        </Card>

        
          {actions.map((action) => (
            <Card key={action.title} className="flex flex-col justify-between">
              <CardHeader className="flex flex-row items-center gap-4">
                <action.icon className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => handleClick(action)} className="w-full">
                 {action.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        
      </div>

      {/* Subjects List */}
      <Card>
        <CardHeader>
          <CardTitle>Subjects List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : subjects.length === 0 ? (
            <p className="text-muted-foreground">No subjects found</p>
          ) : (
            <ul className="space-y-3 max-h-[55vh] md:max-h-[40vh] overflow-y-auto">
              {subjects.map((subject: SubjectSchema) => (
                <li
                  key={subject.id}
                  className="flex items-center justify-between border p-3 rounded-md"
                >
                  <span>{subject.name}</span>

                  <DeleteSubjectDialog subject={subject} />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl backdrop-blur-md">
            <DialogHeader>
              <DialogTitle>{selectedAction?.title}</DialogTitle>
              <DialogDescription>
                {selectedAction?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">{selectedAction?.content}</div>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
}
