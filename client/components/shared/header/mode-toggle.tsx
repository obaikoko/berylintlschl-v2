'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, Monitor } from 'lucide-react';

const ModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <div className="w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded animate-pulse" />
      </Button>
    );
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-4 w-4" />;
    } else if (theme === 'dark') {
      return <MoonIcon className="h-4 w-4" />;
    } else {
      return <SunIcon className="h-4 w-4" />;
    }
  };

  const getTooltip = () => {
    if (theme === 'system') {
      return 'System theme';
    } else if (theme === 'dark') {
      return 'Dark theme';
    } else {
      return 'Light theme';
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-slate-100 dark:hover:bg-slate-800"
      title={getTooltip()}
    >
      <div className="relative">
        {getIcon()}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 hover:opacity-10 transition-opacity duration-200" />
      </div>
    </Button>
  );
};

export default ModeToggle;
