'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StudentResult } from '@/schemas/resultSchema';
import { useGetStudentResultsDataQuery } from '@/src/features/results/resultApiSlice';
const StudentDashBoardPage = () => {
  const { data, isLoading, isError } = useGetStudentResultsDataQuery({});
  const result: StudentResult | null = data?.result ?? null;

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
        Welcome Back{result ? `, ${result.firstName} ${result.lastName}` : ''}
      </h1>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold'>{data.totalSubjects}</p>
          </CardContent>
          {result && (
            <CardDescription>
              ( {result.level}-{result.subLevel} {result.term} Term,{' '}
              {result.session})
            </CardDescription>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold'>{data.average.toFixed(2)}%</p>
          </CardContent>
          {result && (
            <CardDescription>
              ( {result.level}-{result.subLevel} {result.term} Term,{' '}
              {result.session})
            </CardDescription>
          )}
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

      <div className='mt-8 max-w-[700px]'>
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            {result && result.subjectResults.length > 0 ? (
              <ul className='list-disc list-inside text-sm text-muted-foreground'>
                {result.subjectResults.map((subject, index) => (
                  <li key={index}>{subject.subject}</li>
                ))}
              </ul>
            ) : (
              <p className='text-muted-foreground text-sm'>
                No courses available yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
};

export default StudentDashBoardPage;
