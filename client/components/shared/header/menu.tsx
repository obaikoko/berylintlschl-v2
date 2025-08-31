import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu as MenuIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import SignInButton from './sign-in-button';

const Menu = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/admission', label: 'Admission' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/events', label: 'Events' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex items-center">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            asChild
            variant={isActive(item.href) ? "default" : "ghost"}
            className={`relative px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              isActive(item.href)
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Link href={item.href}>
              {item.label}
              {isActive(item.href) && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
              )}
            </Link>
          </Button>
        ))}
        <div className="ml-4">
          <SignInButton />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Menu
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-2 mt-6">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className={`justify-start h-12 text-left ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : ""
                  }`}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <SignInButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Menu;
