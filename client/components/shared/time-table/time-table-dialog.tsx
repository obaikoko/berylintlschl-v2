'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import TimeTableForm from './time-table-form';

export default function TimeTableDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='default'>Create Time Table</Button>
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] overflow-y-scroll max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Create New Time Table</DialogTitle>
        </DialogHeader>
        <TimeTableForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
