'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users2,
  GraduationCap,
  FileText,
  UserCog,
  Table,
  BadgePlus,
  Hammer,
  CalendarDays,
  SpeakerIcon,
  X,
  Timer,
  DollarSign,
  PenBox,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ModeToggle from '../header/mode-toggle';
import SignOutButton from '../sign-out';

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users2 },
  { label: "Students", href: "/admin/students", icon: GraduationCap },
  { label: "Results", href: "/admin/results", icon: FileText },
  { label: "Subjects", href: "/admin/subjects", icon: PenBox },
  { label: "Staff", href: "/admin/staff", icon: UserCog },
  { label: "Scheme of work", href: "/admin/scheme", icon: BadgePlus },
  { label: "Time table", href: "/admin/time-table", icon: Timer },
  { label: "Broadsheet", href: "/admin/broadsheet", icon: Table },
  { label: "Admission", href: "/admin/admission", icon: BadgePlus },
  { label: "Announcements", href: "/admin/announcement", icon: SpeakerIcon },
  { label: "Actions", href: "/admin/actions", icon: Hammer },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Billing", href: "/admin/billing", icon: DollarSign },
];

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideNav = ({ isOpen, onClose }: SideNavProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/30 z-40 transition-opacity md:hidden',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 flex flex-col w-64 h-screen border-r bg-white dark:bg-gray-900 transition-transform transform',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:sticky md:top-0'
        )}
      >
        {/* Header */}
        <div className='flex items-center justify-between px-4 pt-6 pb-4'>
          <h2 className='text-xl font-bold tracking-tight'>Admin Panel</h2>
          <div className='md:hidden'>
            <Button variant='ghost' size='icon' onClick={onClose}>
              <X className='w-5 h-5' />
            </Button>
          </div>
        </div>

        {/* Dark mode toggle */}
        <div className='px-4 pb-2'>
          <ModeToggle />
        </div>

        {/* Scrollable nav container */}
        <div className='flex-1 overflow-y-auto px-4'>
          <nav className='flex flex-col gap-2 pb-6'>
            {navItems.map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href}>
                <Button
                  variant='ghost'
                  className={cn(
                    'w-full justify-start gap-3',
                    pathname === href && 'bg-muted hover:bg-muted font-semibold'
                  )}
                >
                  <Icon className='h-5 w-5' />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sign out at bottom */}
        <div className='px-4 py-4 border-t'>
          <SignOutButton />
        </div>
      </aside>
    </>
  );
};

export default SideNav;
