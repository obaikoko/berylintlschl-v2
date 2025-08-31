'use client';

import React from 'react';
import { useGetSingleAdmissionQuery } from '@/src/features/admission/admissionApiSlice';
import { formatDateTime } from '@/lib/utils';
import Spinner from '@/components/shared/spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import MailDialog from '../mail-dailog-box';

const AdmissionDetails = ({ requestId }: { requestId: string }) => {
  const { data, isLoading, isError } = useGetSingleAdmissionQuery(requestId);

  if (isLoading) {
    return (
      <div className='mt-12 flex justify-center'>
        <Spinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='mt-12 text-center text-destructive'>
        Failed to load admission data. Please try again.
      </div>
    );
  }

  return (
    <div className='mt-4 max-w-5xl mx-auto px-4'>
      <Card className='mb-4'>
        <CardContent className=' p-6'>
          <CardTitle className='text-2xl font-bold mb-1'>
            Admission Summary
          </CardTitle>
          <CardDescription className='text-sm opacity-90'>
            Review submitted details for this admission request.
          </CardDescription>
          <CardDescription className='text-sm opacity-90'>
            ID: {requestId}
          </CardDescription>
        </CardContent>
        <CardContent>
          <MailDialog email={data.email} />
        </CardContent>
      </Card>

      <Card className='overflow-hidden shadow-lg border border-muted'>
        <div className='p-6 grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <Detail label='First Name' value={data.firstName} />
          <Detail label='Last Name' value={data.lastName} />
          <Detail label='Email Address' value={data.email} />
          <Detail label='Phone Number' value={data.phone} />
          <Detail label="Child's Name" value={data.childName} />
          <Detail
            label='Date of Birth'
            value={formatDateTime(data.dateOfBirth)}
          />
          <Detail label='Gender' value={data.gender} />
          <Detail label='Class Applying For' value={data.level} />
          <Detail label='Submitted On' value={formatDateTime(data.createdAt)} />
        </div>
      </Card>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className='space-y-1'>
    <p className='text-xs uppercase font-semibold  '>{label}</p>
    <p className='text-base font-medium  dark:'>{value}</p>
  </div>
);

export default AdmissionDetails;
