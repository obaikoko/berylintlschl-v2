'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, GraduationCap } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useStudentLoginMutation } from '@/src/features/auth/studentsApiSlice';
import { setCredentials } from '@/src/features/auth/authSlice';
import { useRouter } from 'next/navigation';

import { authStudentSchema, studentSchema, } from '@/validators/studentValidation';
import { showZodErrors } from '@/lib/utils';
import { AuthStudentForm } from '@/schemas/studentSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const StudentCredentialsSignInForm = () => {
  const [login, { isLoading }] = useStudentLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthStudentForm>({
    resolver: zodResolver(authStudentSchema),
  });

  const onSubmit = async (data: AuthStudentForm) => {
    try {
      const result = studentSchema.safeParse(await login(data).unwrap());

      if (!result.success) {
        toast.error('Invalid response from server');
        console.error(result.error);
        return;
      }

      const res = result.data;
      dispatch(setCredentials(res));

      toast.success(`Welcome back, ${res.firstName} ${res.lastName}!`);
      router.push('/student/dashboard');
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-gray-500">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="studentId" className="text-sm font-medium text-gray-700">
            Student Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="studentId"
              type="text"
              autoComplete="studentId"
              placeholder="Enter your student ID"
              className="pl-10 h-11 border-gray-200 focus:border-green-500 focus:ring-green-500"
              {...register('studentId')}
            />
          </div>
          {errors.studentId && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <span className="w-1 h-1 bg-red-500 rounded-full mr-2" />
              {errors.studentId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="pl-10 pr-10 h-11 border-gray-200 focus:border-green-500 focus:ring-green-500"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <span className="w-1 h-1 bg-red-500 rounded-full mr-2" />
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <Button
        disabled={isLoading}
        className="w-full h-11 bg-gradient-to-r from-blue-950 to-indigo-600 hover:from-blue-700 hover:to-blue-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
        variant="default"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Signing in...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span>Student Sign In</span>
          </div>
        )}
      </Button>
    </form>
  );
};

export default StudentCredentialsSignInForm;
