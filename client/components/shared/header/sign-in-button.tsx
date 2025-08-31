import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';

const SignInButton = () => {
  return (
    <Button 
      asChild 
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 rounded-lg px-6 py-2"
    >
      <Link href='/students/sign-in' className="flex items-center space-x-2">
        <UserIcon className="h-4 w-4" />
        <span>Sign In</span>
      </Link>
    </Button>
  );
};

export default SignInButton;
