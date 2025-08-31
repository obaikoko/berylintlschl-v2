'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useUpdateSchemeOfWorkMutation } from '@/src/features/schemeOfWork/schemeOfWorkApiSlice';
import { showZodErrors } from '@/lib/utils';
import { toast } from 'sonner';

type Topic = {
  week: number;
  topic: string[];
};

type FormData = {
  id: string;
  subject: string;
  level: string;
  term: string;
  topics: Topic[];
};

interface Props {
  scheme: FormData;
}

export default function UpdateSchemeDialog({ scheme }: Props) {
  const [open, setOpen] = useState(false);
  const [updateScheme, { isLoading }] = useUpdateSchemeOfWorkMutation();

  const form = useForm<FormData>({
    defaultValues: scheme,
  });

const { register, control, handleSubmit, reset, watch, setValue, getValues } =
  form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'topics',
  });

  useEffect(() => {
    reset(scheme);
  }, [scheme, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await updateScheme({
        ...data,
        schemeofworkId: data.id,
      }).unwrap();
      toast(res.message);
      setOpen(false);
    } catch (error) {
      showZodErrors(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Update Scheme</Button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Update Scheme of Work</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <input type='hidden' {...register('id')} />

          {/* Static Fields */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Subject</label>
              <Input {...register('subject')} readOnly />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Level</label>
              <Input {...register('level')} readOnly />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Term</label>
              <Input {...register('term')} readOnly />
            </div>
          </div>

          {/* Week Sections */}
          <div className='space-y-6'>
            {fields.map((field, index) => {
              const topics = watch(`topics.${index}.topic`); // 👈 Watch for dynamic topics

              return (
                <div key={field.id} className='border p-4 rounded-md space-y-4'>
                  <div className='flex justify-between items-center'>
                    <h4 className='font-semibold text-base'>
                      Week {index + 1}
                    </h4>
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={() => remove(index)}
                    >
                      Remove Week
                    </Button>
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Week Number
                    </label>
                    <Input
                      type='number'
                      {...register(`topics.${index}.week`, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>

                  {/* Watch-driven Topic Inputs */}
                  <div className='space-y-2'>
                    {topics?.map((_, topicIndex) => (
                      <Input
                        key={topicIndex}
                        placeholder={`Topic ${topicIndex + 1}`}
                        {...register(`topics.${index}.topic.${topicIndex}`)}
                      />
                    ))}
                  </div>

                  <div className='text-right'>
                    <Button
                      type='button'
                      variant='secondary'
                      size='sm'
                      onClick={() => {
                        const current =
                          getValues(`topics.${index}.topic`) || [];
                        setValue(`topics.${index}.topic`, [...current, '']);
                      }}
                    >
                      Add Topic
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Week + Submit */}
          <div className='flex justify-between items-center pt-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => append({ week: fields.length + 1, topic: [''] })}
            >
              Add New Week
            </Button>

            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Submit Updates'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
