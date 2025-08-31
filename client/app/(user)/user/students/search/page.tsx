'use client';
import Spinner from '@/components/shared/spinner';
import StudentsSearch from '@/components/shared/students/student-search';
import StudentsTable from '@/components/shared/students/students-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSearchStudentsQuery } from '@/src/features/students/studentApiSlice';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const UserStudentSearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const level = searchParams.get('level');

  const { data, isLoading, isError } = useSearchStudentsQuery({
    keyword,
    level,
    page: 1,
  });
  const students = data?.students ?? [];

  return (
    <>
      <div className='mb-10'>
        <StudentsSearch />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Search Results for all {keyword} in {level}
          </CardDescription>
        </CardContent>
        <StudentsTable
          students={students}
          isLoading={isLoading}
          isError={isError}
        />
      </Card>
    </>
  );
};


const Search = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <UserStudentSearchPage />
    </Suspense>
  );
};

export default Search;
