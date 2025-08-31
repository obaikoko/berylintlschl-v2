'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

import {
  useDeleteEventMutation,
  useGetEventsQuery,
} from '@/src/features/events/eventApiSlice';
import { showZodErrors } from '@/lib/utils';
import Spinner from '../spinner';

interface DeleteEventButtonProps {
  eventId: string;
}

const DeleteEventButton = ({ eventId }: DeleteEventButtonProps) => {
  const [open, setOpen] = useState(false);
  const [deleteEvent, { isLoading }] = useDeleteEventMutation();
  const { refetch } = useGetEventsQuery();

  const handleConfirmDelete = async () => {
    try {
      await deleteEvent(eventId).unwrap();
      toast.success('Event deleted successfully');
      refetch();
      setOpen(false);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size='sm'
          variant='destructive'
          className='cursor-pointer'
          onClick={() => setOpen(true)}
        >
          {isLoading ? <Spinner /> : <Trash className='h-4 w-4' />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this event? This action is
            irreversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex justify-end space-x-2'>
          <Button variant='ghost' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleConfirmDelete}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEventButton;
