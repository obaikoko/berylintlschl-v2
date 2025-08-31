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
import { Key, Shield, ArrowLeft } from 'lucide-react';
import ForgetPasswordForm from './forget-password-form';

const ForgetPasswordPage = () => {
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
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your email address and we&apos;ll send you a reset link
            </CardDescription>
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Key className="w-4 h-4" />
              <span>Secure Reset</span>
            </div>
            <div className="w-px h-4 bg-gray-300" />
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Protected</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <ForgetPasswordForm />
          
          <div className="pt-4 border-t border-gray-100">
            <div className="text-center text-sm text-gray-600 space-y-2">
              <p>
                Are you a student?{' '}
                <Link 
                  href="/students/forget-password" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Reset student password
                </Link>
              </p>
              <Link 
                href="/sign-in" 
                className="inline-flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPasswordPage;
