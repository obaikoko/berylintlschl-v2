'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetTimeTableForClassQuery } from '@/src/features/timeTable/timeTableApiSlice';
import Spinner from '@/components/shared/spinner';
import clsx from 'clsx';
import { subjectColors } from '@/lib/utils';
import { useAppSelector } from '@/src/app/hooks';

const StudentTimeTableDetails = () => {
  const { user } = useAppSelector((state) => state.auth);
  const level = user?.level;
  const subLevel = user?.subLevel;

  const {
    data: timeTable,
    isLoading,
    isError,
  } = useGetTimeTableForClassQuery({ level, subLevel });

  if (isLoading)
    return (
      <Card>
        <CardContent>
          <Spinner />
          Loading time table...
        </CardContent>
      </Card>
    );

  if (isError || !timeTable)
    return (
      <Card>
        <CardContent>No time table found or an error occurred.</CardContent>
      </Card>
    );

  return (
    <div className='max-w-5xl mx-auto px-4 py-10 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Weekly Time Table</h1>
      </div>

      <div>
        {/* Desktop View: Card/Table */}
        <div className='hidden md:block'>
          <Card className='shadow-lg'>
            <CardHeader>
              <CardTitle className='text-2xl'>
                Full Time Table For {level}-{subLevel}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {timeTable.length === 0 ? (
                <>NO DATA FOUND!</>
              ) : (
                <>
                  {timeTable.map((dayBlock) => (
                    <div key={dayBlock.day}>
                      <div className='flex justify-between'>
                        {' '}
                        <h3 className='text-lg font-semibold text-primary mb-2'>
                          {dayBlock.day}
                        </h3>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className='w-1/3'>Time</TableHead>
                            <TableHead>Subject</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dayBlock.periods.map((period, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {period.startTime} - {period.endTime}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={clsx(
                                    'px-2 py-1 text-sm rounded-md',
                                    subjectColors[period.subject] ||
                                      'bg-gray-100 text-gray-800'
                                  )}
                                >
                                  {period.subject}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Mobile View: Accordion */}
        <div className='md:hidden'>
          <Accordion type='single' collapsible>
            {timeTable.map((dayBlock) => (
              <AccordionItem value={dayBlock.day} key={dayBlock.day}>
                <AccordionTrigger>{dayBlock.day}</AccordionTrigger>

                <AccordionContent>
                  <Table>
                    <TableBody>
                      {dayBlock.periods.map((period, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            {period.startTime} - {period.endTime}
                          </TableCell>
                          <TableCell>
                            <span
                              className={clsx(
                                'px-2 py-1 text-sm rounded-md',
                                subjectColors[period.subject] ||
                                  'bg-gray-100 text-gray-800'
                              )}
                            >
                              {period.subject}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default StudentTimeTableDetails;
