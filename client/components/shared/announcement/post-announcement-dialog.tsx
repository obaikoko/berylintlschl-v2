'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAnnouncementSchema } from '@/validators/announcementValidation';
import { useCreateAnnouncementMutation } from '@/src/features/announcement/announcementApiSlice';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';
import { AnnouncementFormSchema } from '@/schemas/announcement';
import { Textarea } from '@/components/ui/textarea';

export default function PostAnnouncement({}) {
  const [createAnnouncement, { isLoading }] = useCreateAnnouncementMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnnouncementFormSchema>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues: {
      title: '',
      message: '',
      target: '',
    },
  });

  const onSubmit = async (data: AnnouncementFormSchema) => {
    try {
      await createAnnouncement({
        ...data,
      }).unwrap();
      reset();
      toast.success('Announcement uploaded successfully');
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <>
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
          <Label htmlFor='message'>Message</Label>
          <Textarea id='message' {...register('message')} />
          {errors.message && (
            <p className='text-sm text-red-500'>{errors.message.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='target'>Target Audience</Label>

          <select
            id='target'
            className='my-2 bg-background text-foreground outline p-2 '
            {...register('target')}
          >
            <option value=''>Select Target Audience</option>
            <option value='All'>All</option>
            <option value='Teacher'>Teacher</option>
            <option value='Student'>Student</option>
          </select>
          {errors.target && (
            <p className='text-sm text-red-500'>{errors.target.message}</p>
          )}
        </div>

        <Button type='submit' disabled={isLoading} className='w-full'>
          {isLoading ? (
            <>
              <Loader2 className='h-4 w-4 animate-spin mr-2' />
              Updating...
            </>
          ) : (
            'Update Announcement'
          )}
        </Button>
      </form>
    </>
  );
}
