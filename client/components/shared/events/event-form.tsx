'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventForm } from '@/validators/eventValidator';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAddEventMutation } from '@/src/features/events/eventApiSlice';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { EventFormSchema } from '@/schemas/eventSchema';
import { showZodErrors } from '@/lib/utils';

const AddEventForm = () => {
const [image, setImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormSchema>({
    resolver: zodResolver(eventForm),
  });

  const [addEvent, { isLoading }] = useAddEventMutation();

  const onSubmit = async (data: EventFormSchema) => {
    console.log('uploading...')
    try {
      await addEvent({
        title: data.title,
        description: data.description,
        date: data.date,
        imageUrl: image,
      }).unwrap();
      toast.success(`${data.title} added successfully`);
    } catch (err) {
      showZodErrors(err);
    }
  };
const resizeFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      Resizer.imageFileResizer(
        file,
        640,
        510,
        'JPEG',
        70,
        0,
        (uri) => {
          if (typeof uri === 'string') {
            resolve(uri);
          } else {
            reject(new Error('Unexpected return type from resizer'));
          }
        },
        'base64'
      );
    } catch (err) {
      reject(err);
    }
  });
};

const handleImageChange = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (file) {
    try {
      const resizedImage = await resizeFile(file);
      setImage(resizedImage);
    } catch (error) {
      toast.error('Error resizing image');
      console.error('Error resizing image:', error);
    }
  }
};

  return (
    <form  onSubmit={(e) => {
      console.log('📨 Form submitted');
      handleSubmit(onSubmit)(e);
    }} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
            <p className='text-sm text-red-500'>{errors.description.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='title'>Date</Label>
          <Input type='date' id='date' {...register('date')} />
          {errors.date && (
            <p className='text-sm text-red-500'>{errors.date.message}</p>
          )}
        </div>
      </div>
      <div className='flex flex-col '>
        <Label htmlFor='studentPassport' className='form-label'>
          Add Photo
        </Label>
        <Input type='file' accept='image/*' onChange={handleImageChange} />
      </div>
      <Button
        type='submit'
        className='w-full cursor-pointer'
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Upload'}
      </Button>
    </form>
  );
};

export default AddEventForm;
