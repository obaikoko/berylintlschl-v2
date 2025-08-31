'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Mail, ArrowRight, GraduationCap } from 'lucide-react';
import { useForgetStudentPasswordMutation } from '@/src/features/students/studentApiSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgetPasswordSchema } from '@/validators/userValidators';
import { showZodErrors } from '@/lib/utils';
import { ForgetPasswordForm as ForgetPaswordFormType } from '@/schemas/userSchema';

const StudentForgetPasswordForm = () => {
  const [forgetPassword, { isLoading }] = useForgetStudentPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPaswordFormType>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: ForgetPaswordFormType) => {
    try {
      const res = await forgetPassword(data).unwrap();
      toast.success(res);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Student Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your student email"
            className="pl-10 h-11 border-gray-200 focus:border-green-500 focus:ring-green-500"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <span className="w-1 h-1 bg-red-500 rounded-full mr-2" />
            {errors.email.message}
          </p>
        )}
      </div>

      <Button 
        disabled={isLoading} 
        className="w-full h-11 bg-gradient-to-r from-blue-950 to-indigo-600 hover:from-blue-700 hover:to-blue-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
        variant="default"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Sending reset link...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span>Send Student Reset Link</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </Button>
    </form>
  );
};

export default StudentForgetPasswordForm;
