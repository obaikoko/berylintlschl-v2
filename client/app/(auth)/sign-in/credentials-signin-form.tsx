'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/src/features/auth/usersApiSlice';
import { setCredentials } from '@/src/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import {
  authResponseSchema,
  authUserSchema,
} from '@/validators/userValidators';
import { showZodErrors } from '@/lib/utils';
import { AuthUserForm } from '@/schemas/userSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const CrendentialsSignInForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthUserForm>({
    resolver: zodResolver(authUserSchema),
  });

  const onSubmit = async (data: AuthUserForm) => {
    try {
      const result = authResponseSchema.safeParse(await login(data).unwrap());

      if (!result.success) {
        toast.error('Invalid response from server');
        console.error(result.error);
        return;
      }

      const res = result.data;
      dispatch(setCredentials(res));

      toast.success(`Welcome back, ${res.firstName} ${res.lastName}!`);
      router.push(res.isAdmin ? '/admin/dashboard' : '/user/dashboard');
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-gray-500">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
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
              className="pl-10 pr-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
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
        className="w-full h-11 bg-gradient-to-r from-blue-950 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
        variant="default"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Signing in...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </div>
        )}
      </Button>
    </form>
  );
};

export default CrendentialsSignInForm;
