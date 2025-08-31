'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { Lock, Shield, AlertCircle } from 'lucide-react';
import Spinner from '@/components/shared/spinner';
import ResetPasswordForm from './reset-password-form';
import { useSearchParams } from 'next/navigation';

const ResetPasswordFormWrapper = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="text-center p-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-red-800">Invalid Reset Link</h3>
                <p className="text-red-600 text-sm">
                  The password reset link is invalid or has expired. Please request a new one.
                </p>
              </div>
              <Link 
                href="/forget-password"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
              >
                Request New Reset Link
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
};

const ResetPasswordPage = () => {
  return (
    <div className="w-full">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-6 text-center pb-8">
          <Link href="/" className="flex justify-center group">
            <div className="relative">
              <Image
                src="/images/logo.png"
                width={80}
                height={80}
                alt="School Logo"
                priority={true}
                className="transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors" />
            </div>
          </Link>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-950 to-indigo-600 bg-clip-text text-transparent">
              Create New Password
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your new password below
            </CardDescription>
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Lock className="w-4 h-4" />
              <span>Secure Password</span>
            </div>
            <div className="w-px h-4 bg-gray-300" />
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Protected</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Suspense fallback={<Spinner />}>
            <ResetPasswordFormWrapper />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;

