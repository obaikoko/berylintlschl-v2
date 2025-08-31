'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Users, UserPlus, UserCheck } from 'lucide-react';
import { useGetStaffDataQuery } from '@/src/features/data/dataApiSlice';
import { useGetAllStaffQuery } from '@/src/features/staff/staffApiSlice';
import Spinner from '@/components/shared/spinner';
import StaffTable from '@/components/shared/staff/staff-table';

const StaffPage = () => {
  const { data, isLoading, isError } = useGetStaffDataQuery({});

  const {
    data: staff,
    isLoading: loadingStaff,
    isError: staffError,
  } = useGetAllStaffQuery(1);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Spinner /> Loading...
        </CardHeader>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card>
        <CardHeader>Error fetching data</CardHeader>
      </Card>
    );
  }
  return (
    <div className='space-y-6 p-4'>
      <h1 className='text-2xl font-semibold'>Staff Overview</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-base'>
              <Users className='h-5 w-5 text-primary' />
              Total Staff
            </CardTitle>
          </CardHeader>
          <CardContent className='text-3xl font-bold'>
            {data.totalStaff}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-base'>
              <UserPlus className='h-5 w-5 text-primary' />
              Males
            </CardTitle>
          </CardHeader>
          <CardContent className='text-3xl font-bold'>{data.Males}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-base'>
              <UserCheck className='h-5 w-5 text-primary' />
              Femal
            </CardTitle>
          </CardHeader>
          <CardContent className='text-3xl font-bold'>
            {data.Females}
          </CardContent>
        </Card>
      </div>

      {/* Recent Staff Table Placeholder */}
      <div className='mt-6'>
        <Card>
          <CardHeader>
            <CardTitle className='text-base'> Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            
            <StaffTable
              staff={staff?.staff}
              isLoading={loadingStaff}
              isError={staffError}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffPage;
