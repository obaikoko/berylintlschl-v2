'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateTimeTableMutation } from '@/src/features/timeTable/timeTableApiSlice';
import { toast } from 'sonner';
import { days, levels, showZodErrors, subLevels } from '@/lib/utils';
import { createTimeTableSchema } from '@/validators/timeTableValidator';
import { TimeTableFormValues } from '@/schemas/timeTableSchema';

export default function TimeTableForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [createTimeTable, { isLoading }] = useCreateTimeTableMutation();

  const form = useForm<TimeTableFormValues>({
    resolver: zodResolver(createTimeTableSchema),
    defaultValues: {
      level: '',
      subLevel: '',
      day: '',
      periods: [{ subject: '', startTime: '', endTime: '' }],
    },
  });

  const { register, handleSubmit, control, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'periods',
  });

  const onSubmit = async (values: TimeTableFormValues) => {
    try {
      await createTimeTable(values).unwrap();
      toast.success('Time table created successfully');
      reset();
      onSuccess();
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 bg-background text-foreground'
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label className='block mb-1 font-medium'>Level</label>
          <select
            {...register('level')}
            className='w-full border px-3 py-2 rounded bg-background text-foreground'
          >
            <option value=''>Select Level</option>
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block mb-1 font-medium '>Sub-Level</label>
          <select
            {...register('subLevel')}
            className='w-full border px-3 py-2 rounded bg-background text-foreground'
          >
            <option value=''>Select Sub-Level</option>
            {subLevels.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block mb-1 font-medium'>Day</label>
          <select
            {...register('day')}
            className='w-full border px-3 py-2 rounded bg-background text-foreground'
          >
            <option value=''>Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='font-semibold'>Periods</h3>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className='grid grid-cols-1 md:grid-cols-4 gap-4 items-end'
          >
            <div>
              <label className='block mb-1 font-medium bg-background text-foreground'>
                Subject
              </label>
              <Input
                {...register(`periods.${index}.subject`)}
                placeholder='e.g. Basic Science'
              />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Start Time</label>
              <Input type='time' {...register(`periods.${index}.startTime`)} />
            </div>
            <div>
              <label className='block mb-1 font-medium'>End Time</label>
              <Input type='time' {...register(`periods.${index}.endTime`)} />
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
          onClick={() => append({ subject: '', startTime: '', endTime: '' })}
        >
          Add Period
        </Button>
      </div>

      <Button disabled={isLoading} type='submit' className='w-full'>
        {isLoading ? 'Uploading...' : 'Submit Time Table'}
      </Button>
    </form>
  );
}
