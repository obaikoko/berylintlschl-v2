"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Student } from "@/schemas/studentSchema";
import { showZodErrors } from "@/lib/utils";

export default function DownloadStudentIdCard({
  student,
}: {
  student: Student;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      toast.loading("Generating ID Card...");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/students/${student.id}/id-card`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate ID card");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${student.firstName}-${student.lastName}-ID-CARD.pdf`;
      link.click();

      window.URL.revokeObjectURL(url);

      toast.success("ID Card downloaded successfully!");
    } catch (error) {
      showZodErrors(error);
    } finally {
      toast.dismiss(); // Remove the "loading" toast
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={loading}>
      {loading ? "Downloading..." : "Download ID Card"}
    </Button>
  );
}
