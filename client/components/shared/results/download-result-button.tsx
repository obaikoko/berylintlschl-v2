'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';
import { useGetResultQuery } from '@/src/features/results/resultApiSlice';

const DownloadResult = ({ resultId }: { resultId: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {data} = useGetResultQuery(resultId)
const handleDownload = async () => {
  try {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/results/pdf/${resultId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      // Try to read response message if available
      let errorMessage = "Failed to download PDF";
      try {
        const data = await res.json();
        if (data?.message) errorMessage = data.message;
      } catch {
        // Fallback to text if JSON parsing fails
        const text = await res.text();
        if (text) errorMessage = text;
      }

      toast.error(errorMessage);
      return;
    }

    // If successful, get the PDF blob
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `result-${data?.firstName}-${data?.lastName}.pdf`;
    a.click();

    window.URL.revokeObjectURL(url);

    toast.success("PDF downloaded successfully!");
    setOpen(false);
  } catch (error) {
    console.error("Download error:", error);
    showZodErrors(error);
    toast.error("An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Button
        className='cursor-pointer'
        variant='outline'
        onClick={() => setOpen(true)}
      >
        <Download className='mr-2 h-4 w-4' />
        Download Result
      </Button>

      <Dialog open={open} onOpenChange={(val) => !loading && setOpen(val)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Result</DialogTitle>
            <DialogDescription>
              Are you sure you want to download this result as a PDF?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className='flex justify-end gap-2'>
            <Button
              className='cursor-pointer'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className='cursor-pointer'
              onClick={handleDownload}
              disabled={loading}
            >
              {loading ? 'Downloading...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DownloadResult;
