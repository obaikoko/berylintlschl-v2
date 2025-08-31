'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  useUpdateTimeTableMutation,
} from '@/src/features/timeTable/timeTableApiSlice';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';
import { createTimeTableSchema } from '@/validators/timeTableValidator';
import { TimeTableFormValues } from '@/schemas/timeTableSchema';

export default function UpdateTimeTableDialog({
  level,
  subLevel,
  day,
  periods,
}: TimeTableFormValues) {
  const [open, setOpen] = useState(false);
  const [updateTimeTable, { isLoading }] = useUpdateTimeTableMutation();

  const form = useForm<TimeTableFormValues>({
    resolver: zodResolver(createTimeTableSchema),
    defaultValues: {
      level: level ?? '',
      subLevel: subLevel ?? '',
      day: day ?? '',
      periods: periods ?? [{ subject: '', startTime: '', endTime: '' }],
    },
  });

  const { register, handleSubmit, control, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'periods',
  });

  useEffect(() => {
    if (open) {
      reset({
        level: level ?? '',
        subLevel: subLevel ?? '',
        day: day ?? '',
        periods: periods ?? [{ subject: '', startTime: '', endTime: '' }],
      });
    }
  }, [open, reset, level, subLevel, day, periods]);

  const onSubmit = async (values: TimeTableFormValues) => {
    try {
      await updateTimeTable(values).unwrap();
      toast.success('Time table updated successfully');
      reset();
      setOpen(false);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='cursor-pointer' size='icon'>
          <span>Edit</span>
        </Button>
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] overflow-y-scroll max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Update Time Table</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 bg-background text-foreground'
        >
          {/* Static Fields */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <Input
                value={level}
                disabled
                readOnly
                className='w-full border px-3 py-2 rounded'
              />
            </div>

            <div>
              <Input
                value={subLevel}
                disabled
                readOnly
                className='w-full border px-3 py-2 rounded'
              />
            </div>

            <div>
              <Input
                value={day}
                disabled
                readOnly
                className='w-full border px-3 py-2 rounded'
              />
            </div>
          </div>

          {/* Period Fields */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Periods</h3>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='grid grid-cols-1 md:grid-cols-4 gap-4 items-end'
              >
                <div>
                  <label className='block mb-1 font-medium'>Subject</label>
                  <Input
                    {...register(`periods.${index}.subject`)}
                    placeholder='e.g. Basic Science'
                  />
                </div>
                <div>
                  <label className='block mb-1 font-medium'>Start Time</label>
                  <Input
                    type='time'
                    {...register(`periods.${index}.startTime`)}
                  />
                </div>
                <div>
                  <label className='block mb-1 font-medium'>End Time</label>
                  <Input
                    type='time'
                    {...register(`periods.${index}.endTime`)}
                  />
                </div>
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type='button'
              variant='outline'
              onClick={() =>
                append({ subject: '', startTime: '', endTime: '' })
              }
            >
              Add Period
            </Button>
          </div>

          <Button disabled={isLoading} type='submit' className='w-full'>
            {isLoading ? 'Updating...' : 'Submit Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
