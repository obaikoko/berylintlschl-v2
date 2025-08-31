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
import { Shield, ArrowLeft, GraduationCap } from 'lucide-react';
import StudentForgetPasswordForm from './forget-password-form';

const StudentForgetPasswordPage = () => {
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
              <div className="absolute inset-0 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-colors" />
            </div>
          </Link>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-950 to-indigo-600 bg-clip-text text-transparent">
              Student Password Reset
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your student email to receive a reset link
            </CardDescription>
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <GraduationCap className="w-4 h-4" />
              <span>Student Portal</span>
            </div>
            <div className="w-px h-4 bg-gray-300" />
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <StudentForgetPasswordForm />
          
          <div className="pt-4 border-t border-gray-100">
            <div className="text-center text-sm text-gray-600 space-y-2">
              <p>
                Are you staff or admin?{' '}
                <Link 
                  href="/forget-password" 
                  className="text-blue-950 hover:text-blue-700 font-medium transition-colors"
                >
                  Reset staff password
                </Link>
              </p>
              <Link 
                href="/students/sign-in" 
                className="inline-flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Student Sign In</span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentForgetPasswordPage;