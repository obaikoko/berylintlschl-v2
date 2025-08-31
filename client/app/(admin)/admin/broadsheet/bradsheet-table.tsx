'use client';
import { Broadsheet } from '@/schemas/resultSchema';
import React from 'react';
const BroadsheetTable = ({ data }: { data: Broadsheet[] }) => {
  if (data.length === 0)
    return <p className='text-center text-gray-500'>No data available</p>;

  const subjects =
    data[0]?.subjectResults.map((subject) => subject.subject) || [];

  return (
    <div className='w-full overflow-x-auto rounded-lg border  shadow-sm'>
      <table className='min-w-[800px] border-collapse '>
        <thead className=' sticky top-0 z-10'>
          <tr>
            <th className='px-4 py-2 border text-left'>Student Name</th>
            {subjects.map((subject) => (
              <th
                key={subject}
                colSpan={3}
                className='px-4 py-2 border text-center'
              >
                {subject}
              </th>
            ))}
          </tr>
          <tr>
            <th className='px-4 py-2 border'></th>
            {subjects.map((subject) => (
              <React.Fragment key={subject}>
                <th className='px-2 py-1 border text-center text-xs font-medium'>
                  Test
                </th>
                <th className='px-2 py-1 border text-center text-xs font-medium'>
                  Exam
                </th>
                <th className='px-2 py-1 border text-center text-xs font-medium'>
                  Total
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((student, idx) => (
            <tr key={idx} className=''>
              <td className='px-4 py-2 border font-medium whitespace-nowrap'>
                {`${student.firstName} ${student.lastName} (${student.position})`}
              </td>
              {student.subjectResults.map((subject) => (
                <React.Fragment key={`${student.firstName}-${subject.subject}`}>
                  <td className='px-2 py-1 border text-center'>
                    {subject.testScore}
                  </td>
                  <td className='px-2 py-1 border text-center'>
                    {subject.examScore}
                  </td>
                  <td className='px-2 py-1 border text-center'>
                    {subject.testScore + subject.examScore}
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BroadsheetTable;
