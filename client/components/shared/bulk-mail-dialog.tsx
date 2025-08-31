'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useSendBulkMailsMutation } from '@/src/features/auth/usersApiSlice';
import { showZodErrors } from '@/lib/utils';
import { toast } from 'sonner';
import { mailSchema } from '@/validators/mailValidator';
import { MailFormSchema } from '@/schemas/mailSchema';

export default function BulkMailDialog() {
  const [sendMail, { isLoading }] = useSendBulkMailsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MailFormSchema>({
    resolver: zodResolver(mailSchema),
  });
  const onSubmit = async (values: MailFormSchema) => {
    try {
      const res = await sendMail({
        subject: values.subject,
        text: values.body, // assuming 'text' refers to the body
      }).unwrap();
      toast.success(res);
    } catch (error) {
      showZodErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <Input
          value='All Registered Sponsor Email'
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

      <Button className='cursor-pointer' type='submit' disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
}
