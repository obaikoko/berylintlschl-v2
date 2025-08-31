'use client';
import {
  useGetResultsQuery,
  useGetResultsDataQuery,
} from '@/src/features/results/resultApiSlice';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ResultList from '@/components/shared/results/results-list';
import Spinner from '@/components/shared/spinner';

const UserResultsPage = () => {
  const { data: results, isLoading, isError } = useGetResultsQuery(1);
    const { data: resultsData } = useGetResultsDataQuery({});

  

  if (isLoading) {
    return (
      <div className='p-6'>
        <Card>
          <CardHeader>
            <Spinner />
            Loading...
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isError || !results) {
    return (
      <div className='p-6'>
        <Card>
          <CardHeader className='text-destructive'>
            Error fetching results
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className='p-4 space-y-6'>
      <h1 className='text-2xl font-semibold'>Results Overview</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Total Results</CardTitle>
            <CardDescription>All uploaded results</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold'>
            {resultsData?.totalResults}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Published</CardTitle>
            <CardDescription>Visible to students</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-green-600'>
            {resultsData?.publishedResults}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unpublished</CardTitle>
            <CardDescription>Pending publication</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-red-600'>
            {resultsData?.unpublishedResults}
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <ResultList
        results={results.results}
        loading={isLoading}
        error={isError}
      />
    </div>
  );
};

export default UserResultsPage;
