'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Spinner from '../spinner';
import { toast } from 'sonner';
import { useForgetStudentPasswordMutation } from '@/src/features/students/studentApiSlice';
import { showZodErrors } from '@/lib/utils';

export function ChangeStudentPassword({ studentId }: { studentId: string }) {
  const [changePassword, { isLoading }] = useForgetStudentPasswordMutation();

  const handleChange = async () => {
    try {
      const res = await changePassword({ studentId: studentId }).unwrap();
      toast.success(res);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='w-40 my-3 cursor-pointer'>
          {isLoading ? <Spinner /> : 'Change Password'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change Password?</AlertDialogTitle>
          <AlertDialogDescription>
            This will send you instructions to update your password. Are you
            sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleChange}>
            {isLoading ? <Spinner /> : 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
