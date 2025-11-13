"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "../spinner";

import {
  useUpdateResultMutation,
  useGetResultQuery,
} from "@/src/features/results/resultApiSlice";
import { showZodErrors } from "@/lib/utils";

interface UpdateRemarkProps {
  resultId: string;
}

export default function UpdateRemark({ resultId }: UpdateRemarkProps) {
  const [formData, setFormData] = useState({
    teacherRemark: "",
    principalRemark: "",
  });
  const [open, setOpen] = useState(false);

  const { teacherRemark, principalRemark } = formData;
  const { refetch } = useGetResultQuery(resultId, { skip: !resultId });
  const [updateResult, { isLoading }] = useUpdateResultMutation();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updateResult({
        resultId,
        teacherRemark,
        principalRemark,
      }).unwrap();

      if (res) {
        refetch();
        toast.success("Remarks uploaded successfully");
        setOpen(false);
      }
    } catch (error) {
      showZodErrors(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Update Remark</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Update Remark</DialogTitle>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4 mt-2">
            <div>
              <label
                htmlFor="teacherRemark"
                className="block text-sm font-medium mb-1"
              >
                Teacher’s Remark
              </label>
              <Textarea
                id="teacherRemark"
                name="teacherRemark"
                value={teacherRemark}
                onChange={onChange}
                placeholder="Enter teacher’s remark..."
              />
            </div>

            <div>
              <label
                htmlFor="principalRemark"
                className="block text-sm font-medium mb-1"
              >
                Principal’s Remark
              </label>
              <Textarea
                id="principalRemark"
                name="principalRemark"
                value={principalRemark}
                onChange={onChange}
                placeholder="Enter principal’s remark..."
              />
            </div>

            <DialogFooter className="flex justify-end gap-3 mt-4">
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Upload</Button>
                </>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
