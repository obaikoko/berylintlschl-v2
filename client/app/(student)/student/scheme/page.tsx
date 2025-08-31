'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

import { useGetClassSchemeOfWorkQuery } from '@/src/features/schemeOfWork/schemeOfWorkApiSlice';
import { useAppSelector } from '@/src/app/hooks';
import { Input } from '@/components/ui/input';
import { subjects, terms } from '@/lib/utils';

export default function SchemeOfWorkPage() {
  const { user } = useAppSelector((state) => state.auth);
  const level = user?.level;
  const [term, setTerm] = useState('');
  const [subject, setSubject] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  const { data, isLoading, isError } = useGetClassSchemeOfWorkQuery(
    { level, term, subject },
    { skip: !searchClicked }
  );

  const handleSearch = () => {
    if (level && term && subject) {
      setSearchClicked(true);
    }
  };

  return (
    <Card className='w-full max-w-5xl mx-auto mt-6'>
      <CardHeader>
        <CardTitle>Scheme of Work</CardTitle>
      </CardHeader>

      <CardContent className='space-y-6'>
        {/* Search Form */}
        <div className='flex flex-wrap gap-4 items-end'>
          <div className='w-[180px]'>
            <Input value={level} disabled readOnly />
          </div>

          <div className='w-[180px]'>
            <label className='text-sm text-muted-foreground'>Term</label>
            <Select onValueChange={setTerm}>
              <SelectTrigger>
                <SelectValue placeholder='Select Term' />
              </SelectTrigger>
              <SelectContent>
                {terms.map((trm, index) => (
                  <SelectItem key={index} value={trm}>
                    {trm}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='w-[180px]'>
            <label className='text-sm text-muted-foreground'>Subject</label>
            <Select onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder='Select Subject' />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((sbj, index) => (
                  <SelectItem key={index} value={sbj}>
                    {sbj}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSearch}>Search</Button>
        </div>

        {/* Conditional Content */}
        {isLoading ? (
          <div className='flex justify-center py-10'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : isError ? (
          <p className='text-center text-red-500'>
            Failed to load scheme of work.
          </p>
        ) : !searchClicked ? (
          <p className='text-center text-muted-foreground'>
            Please search to view scheme of work.
          </p>
        ) : data && data.length === 0 ? (
          <p className='text-center text-muted-foreground'>
            No scheme of work found.
          </p>
        ) : (
          <Accordion type='single' collapsible className='w-full'>
            {data?.map((scheme, index) => (
              <AccordionItem key={index} value={`subject-${index}`}>
                <AccordionTrigger>
                  <div className='flex flex-col text-left'>
                    <span className='font-medium'>{scheme.subject}</span>
                    <span className='text-sm text-muted-foreground'>
                      {scheme.level} • {scheme.term} Term
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='space-y-6 mt-2'>
                    {scheme.topics.map((weekTopic, i) => (
                      <div key={i}>
                        <p className='font-semibold text-sm mb-1'>
                          Week {weekTopic.week}{' '}
                        </p>
                        <ul className='list-disc pl-6 space-y-1 text-sm'>
                          {weekTopic.topic.map((topic, j) => (
                            <li
                              key={j}
                              className='flex justify-between items-center'
                            >
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
