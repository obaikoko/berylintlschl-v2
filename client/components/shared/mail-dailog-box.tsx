'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useSendMailMutation } from '@/src/features/auth/usersApiSlice';
import { showZodErrors } from '@/lib/utils';
import { toast } from 'sonner';
import { mailSchema } from '@/validators/mailValidator';
import { MailFormSchema } from '@/schemas/mailSchema';




export default function MailDialog({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const [sendMail, { isLoading }] = useSendMailMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MailFormSchema>({
    resolver: zodResolver(mailSchema),
  });
  const onSubmit = async (values: MailFormSchema) => {
    try {
      const res = await sendMail({
        email: email,
        subject: values.subject,
        text: values.body, 
      }).unwrap();
      toast.success(res);
    } catch (error) {
      showZodErrors(error);
    }
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isLoading && setOpen(val)}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>Send Mail</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Send Mail</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Input
              value={email}
              disabled
              placeholder="Recipient's email"
              type='email'
              readOnly
            />
          </div>
          <div>
            <Input {...register('subject')} placeholder='Subject' />
            {errors.subject && (
              <p className='text-sm text-red-500'>{errors.subject.message}</p>
            )}
          </div>
          <div>
            <Textarea
              {...register('body')}
              placeholder='Type your message...'
              rows={5}
            />
            {errors.body && (
              <p className='text-sm text-red-500'>{errors.body.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              className='cursor-pointer'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
