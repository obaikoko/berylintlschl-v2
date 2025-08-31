'use client';

import StudentsTable from '@/components/shared/students/students-table';
import { Card, CardContent } from '@/components/ui/card';
import { formatDateTime } from '@/lib/utils';
import { useAppSelector } from '@/src/app/hooks';
import { useGetUserProfileQuery } from '@/src/features/auth/usersApiSlice';
import { useGetStudentsQuery } from '@/src/features/students/studentApiSlice';

const TeacherDashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);
    const {
      data: enrolledStudents,
      isLoading: loadingStudents,
      isError: studentError,
    } = useGetStudentsQuery(1);
  const students = enrolledStudents?.students ?? [];


  // Don't run query until user.id is available
  const { data, isLoading, isError } = useGetUserProfileQuery(user?.id ?? '', {
    skip: !user?.id, // Skip until user.id exists
  });

  if (isLoading || !data) {
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className='text-red-500'>
          Failed to load profile data.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>
        Welcome, {data.firstName} {data.lastName}
      </h1>
      <p className='text-muted-foreground'>{data.email}</p>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-white dark:bg-gray-800 rounded-2xl p-4 shadow'>
          <h2 className='text-sm text-muted-foreground'>Class</h2>
          <p className='text-2xl font-semibold'>
            {data.level} - {data.subLevel}
          </p>
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-2xl p-4 shadow'>
          <h2 className='text-sm text-muted-foreground'>Role</h2>
          <p className='text-2xl font-semibold capitalize'>{data.role}</p>
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-2xl p-4 shadow'>
          <h2 className='text-sm text-muted-foreground'>Registered on</h2>
          <p className='text-2xl font-semibold'>
            {formatDateTime(data.createdAt)}
          </p>
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='text-lg font-semibold mb-2'>Recent Enrollments</h2>

        <StudentsTable
          students={students}
          isLoading={loadingStudents}
          isError={studentError}
        />
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
