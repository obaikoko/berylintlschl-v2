'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ClipboardList,
  BookOpen,
  Settings,
  X,
  SpeakerIcon,
  CalendarArrowDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ModeToggle from '../header/mode-toggle';
import SignOutButton from '../sign-out';

const teacherNavItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/user/dashboard', icon: Home },
  {
    id: 'classes',
    label: 'My Classes',
    href: '/user/students',
    icon: ClipboardList,
  },
  { id: 'results', label: 'Results', href: '/user/results', icon: BookOpen },
  {
    id: 'announcement',
    label: 'Announcement',
    href: '/user/announcement',
    icon: SpeakerIcon,
  },
  {
    id: 'scheme',
    label: 'Scheme of work',
    href: '/user/scheme',
    icon: BookOpen,
  },
  {
    id: 'timeTable',
    label: 'Time Table ',
    href: '/user/time-table',
    icon: CalendarArrowDown,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/user/settings',
    icon: Settings,
  },
];

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSideNav = ({ isOpen, onClose }: SideNavProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/30 z-40 transition-opacity md:hidden',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 flex flex-col w-64 h-full border-r bg-white dark:bg-gray-900 px-4 py-6 transition-transform transform',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:flex md:h-screen md:sticky md:top-0'
        )}
      >
        <div className='mb-8 flex justify-between items-center'>
          <h2 className='text-xl font-bold tracking-tight'>Navigation Panel</h2>
          <div className='md:hidden'>
            <Button variant='ghost' size='icon' onClick={onClose}>
              <X className='w-5 h-5' />
            </Button>
          </div>
        </div>

        <ModeToggle />

        <nav
          className='flex flex-col gap-2 flex-1 mt-4'
          aria-label='Student sidebar navigation'
        >
          {teacherNavItems.map(({ id, label, href, icon: Icon }) => (
            <Link key={id} href={href}>
              <Button
                asChild
                variant='ghost'
                className={cn(
                  'w-full justify-start gap-3',
                  pathname === href
                    ? 'bg-muted hover:bg-muted font-semibold border-l-4 border-primary pl-2'
                    : 'pl-3'
                )}
              >
                <span className='flex items-center gap-3'>
                  <Icon className='h-5 w-5' />
                  {label}
                </span>
              </Button>
            </Link>
          ))}
        </nav>

        <div className='mt-auto'>
          <SignOutButton />
        </div>
      </aside>
    </>
  );
};
export default UserSideNav;
