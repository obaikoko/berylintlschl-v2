'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventForm } from '@/validators/eventValidator';
import { EventFormSchema } from '@/schemas/eventSchema';
import { useEffect, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { useUpdateEventMutation } from '@/src/features/events/eventApiSlice';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';
import { EventSchema } from '@/schemas/eventSchema';

interface EditEventDialogProps {
  event: EventSchema;
}

export default function EditEventDialog({ event }: EditEventDialogProps) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>(event.imageUrl || null);

  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventFormSchema>({
    resolver: zodResolver(eventForm),
    defaultValues: {
      title: event.title,
      description: event.description,
      date: event.date,
    },
  });

  useEffect(() => {
    if (open) {
      setValue('title', event.title);
      setValue('description', event.description);
      setValue('date', event.date);
    }
  }, [open, event, setValue]);

  const resizeFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        640,
        510,
        'JPEG',
        70,
        0,
        (uri) => {
          if (typeof uri === 'string') resolve(uri);
          else reject(new Error('Resizing failed'));
        },
        'base64'
      );
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resized = await resizeFile(file);
        setImage(resized);
      } catch (err) {
        toast.error('Failed to resize image');
        console.error(err);
      }
    }
  };

  const onSubmit = async (data: EventFormSchema) => {
    try {
      await updateEvent({
        eventId: event.id,
        ...data,
        imageUrl: image ?? '',
      }).unwrap();
      toast.success('Event updated successfully');
      setOpen(false);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <>
      <Button
        size='sm'
        variant='outline'
        onClick={() => setOpen(true)}
        className='cursor-pointer'
      >
        <Pencil className='h-4 w-4' />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Update event details</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 max-h-[350px] overflow-y-auto'
          >
            <div>
              <Label htmlFor='title'>Title</Label>
              <Input id='title' {...register('title')} />
              {errors.title && (
                <p className='text-sm text-red-500'>{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor='description'>Description</Label>
              <Input id='description' {...register('description')} />
              {errors.description && (
                <p className='text-sm text-red-500'>
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='date'>Date</Label>
              <Input type='date' id='date' {...register('date')} />
              {errors.date && (
                <p className='text-sm text-red-500'>{errors.date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor='imageUrl'>Event Image</Label>
              <Input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
            </div>

            <Button type='submit' disabled={isLoading} className='w-full'>
              {isLoading ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin mr-2' />
                  Updating...
                </>
              ) : (
                'Update Event'
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
