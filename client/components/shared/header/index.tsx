'use client';
import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';
import ModeToggle from './mode-toggle';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="relative">
        {/* Background with blur and gradient */}
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50" />
        
        {/* Content */}
        <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt={`${APP_NAME} logo`}
                  width={48}
                  height={48}
                  priority
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                {APP_NAME}
              </span>
            </Link>

            {/* Navigation and Actions */}
            <div className="flex items-center space-x-4">
              <Menu />
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
