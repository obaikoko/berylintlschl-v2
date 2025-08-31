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
import { createAnnouncementSchema } from '@/validators/announcementValidation';
import { useEffect, useState } from 'react';
import { useUpdateAnnouncementMutation } from '@/src/features/announcement/announcementApiSlice';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';
import { AnnouncementFormSchema, AnnouncementSchema } from '@/schemas/announcement';
import { Textarea } from '@/components/ui/textarea';

export default function EditAnnouncementDialog({
  announcement,
}: {
  announcement: AnnouncementSchema;
}) {
  const [open, setOpen] = useState(false);

  const [updateAnnouncement, { isLoading }] = useUpdateAnnouncementMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AnnouncementFormSchema>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues: {
      title: announcement.title,
      message: announcement.message,
      target: announcement.target,
    },
  });

  useEffect(() => {
    if (open) {
      setValue('title', announcement.title);
      setValue('message', announcement.message);
      setValue('target', announcement.target);
    }
  }, [open, announcement, setValue]);

  const onSubmit = async (data: AnnouncementFormSchema) => {
    try {
      await updateAnnouncement({
        announcementId: announcement.id,
        ...data,
      }).unwrap();
      toast.success('Announcement updated successfully');
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
            <DialogTitle>Edit Announcement</DialogTitle>
            <DialogDescription>Update Announcement details</DialogDescription>
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
                className='my-2 bg-background text-foreground outline'
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
        </DialogContent>
      </Dialog>
    </>
  );
}
