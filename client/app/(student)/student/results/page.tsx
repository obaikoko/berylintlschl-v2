'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StudentResult } from '@/schemas/resultSchema';
import { useGetStudentResultsDataQuery } from '@/src/features/results/resultApiSlice';
import Link from 'next/link';
const StudentResultPage = () => {
  const { data, isLoading, isError } = useGetStudentResultsDataQuery({});
  const result: StudentResult = data?.result ?? '';
  const results: StudentResult[] = data?.results ?? [];

  if (isLoading) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent>Loading Student data...</CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent>Failed to load Student data.</CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>
        Welcome Back, {result.firstName}
        {result.lastName}
      </h1>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold'>{data.totalSubjects}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold'>{data.average.toFixed(2)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold'>{data.totalResults}</p>
          </CardContent>
        </Card>
      </div>

      <div className='mt-8'>
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='overflow-x-auto max-h-[300px] overflow-y-auto border rounded-md'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Result ID</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead>Session</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <Link
                          className='underline'
                          href={`/student/results/${r.id}`}
                        >
                          {`${r.id.slice(0, 6)}...`}
                        </Link>
                      </TableCell>

                      <TableCell>
                        {r.level}
                        {r.subLevel}
                      </TableCell>
                      <TableCell>{r.term}</TableCell>
                      <TableCell>{r.session}</TableCell>

                      <TableCell
                        className={`${
                          r.averageScore >= 50
                            ? 'text-green-600 '
                            : 'text-red-600 '
                        }font-medium`}
                      >
                        {r.averageScore >= 50 ? 'Passed' : 'Failed'}
                      </TableCell>
                    </TableRow>
                  ))}
                  {results.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className='text-center py-4 text-muted-foreground'
                      >
                        No matching results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentResultPage;
