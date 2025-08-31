'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { levels, subLevels } from '@/lib/utils';

const TimeTableSearchForm = () => {
  const router = useRouter();
  const [level, setLevel] = useState('');
  const [subLevel, setSubLevel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (level && subLevel) {
      router.push(
        `/admin/time-table/?level=${encodeURIComponent(
          level
        )}&subLevel=${encodeURIComponent(subLevel)}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className='border  rounded px-4 py-2  bg-background text-foreground'
        required
      >
        <option value=''>Select Level</option>
        {levels.map((lvl) => (
          <option key={lvl} value={lvl}>
            {lvl}
          </option>
        ))}
      </select>

      <select
        value={subLevel}
        onChange={(e) => setSubLevel(e.target.value)}
        className='border  rounded px-4 py-2 bg-background text-foreground'
        required
      >
        <option value=''>Select Sub-Level</option>
        {subLevels.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>

      <Button type='submit' className='  px-6 py-2 rounded  transition'>
        Search
      </Button>
    </form>
  );
};

export default TimeTableSearchForm;
