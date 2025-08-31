'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  useDeleteStaffMutation,
  useGetAllStaffQuery,
} from '@/src/features/staff/staffApiSlice';

import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';

const DeleteStaffButton = ({ staffId }: { staffId: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleteStaff, { isLoading }] = useDeleteStaffMutation();
  const { refetch } = useGetAllStaffQuery({});

  const handleDelete = async () => {
    try {
      await deleteStaff(staffId).unwrap();
      toast.success('Staff deleted successfully');
      refetch();
      router.push('/admin/staff');
      setOpen(false);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <>
      <Button variant='destructive' onClick={() => setOpen(true)}>
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this staff? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className='flex justify-end gap-2'>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteStaffButton;
