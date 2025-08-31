'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useGetStaffQuery } from '@/src/features/staff/staffApiSlice';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import EditStaffDialog from './edit-staff-dialog';
import DeleteStaffButton from './delete-staff-button';

const StaffDetails = ({ staffId }: { staffId: string }) => {
  const { data: staff, isLoading, isError } = useGetStaffQuery(staffId);
  const [editOpen, setEditOpen] = useState(false);

  if (isLoading) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent>Loading staff data...</CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !staff) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent>Failed to load staff data.</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <h1 className='text-3xl font-semibold'>Staff Profile</h1>

      <Card>
        <CardContent className='p-6 flex gap-6'>
          {staff.imageUrl ? (
            <Image
              className='rounded'
              width={150}
              height={120}
              alt='Staff Image'
              src={staff.imageUrl}
            />
          ) : (
            <Avatar className='w-24 h-24'>
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${staff.lastName}+${staff.firstName}`}
              />
              <AvatarFallback>
                {staff.firstName?.[0]}
                {staff.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          )}
          <div className='space-y-1'>
            <h2 className='text-xl font-medium'>
              {staff.lastName} {staff.firstName} {staff.otherName}
            </h2>
            <p className='text-sm text-muted-foreground'>
              ID: ...{staff.id.slice(15, 30)}
            </p>
            <p className='text-sm'>Gender: {staff.gender}</p>
            <p className='text-sm'>Marital Status: {staff.maritalStatus}</p>
            <p className='text-sm'>
              Date of Birth: {formatDateTime(staff.dateOfBirth)}
            </p>
            <p className='text-sm'>
              Admitted: {formatDateTime(staff.yearAdmitted)}
            </p>
            <p className='text-sm'>Role: {staff.role}</p>
            <p className='text-sm'>Category: {staff.category}</p>
            <p className='text-sm'>Qualification: {staff.qualification}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <p>
              <strong>State of Origin:</strong> {staff.stateOfOrigin}
            </p>
            <p>
              <strong>Local Govt:</strong> {staff.localGvt}
            </p>
            <p>
              <strong>Home Town:</strong> {staff.homeTown}
            </p>
            <p>
              <strong>Residence:</strong> {staff.residence}
            </p>
          </div>
          <div className='space-y-2'>
            <p>
              <strong>Phone:</strong> {staff.phone}
            </p>
            <p>
              <strong>Email:</strong> {staff.email}
            </p>
          </div>
        </CardContent>
        <CardContent className='flex justify-end gap-2'>
          <DeleteStaffButton staffId={staff.id} />
          <Button variant='outline' onClick={() => setEditOpen(true)}>
            Edit
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <p className='text-sm text-muted-foreground text-left'>
            Registered On: {formatDateTime(staff.createdAt)}
          </p>
          <p className='text-sm text-muted-foreground text-left'>
            Last Modified: {formatDateTime(staff.updatedAt)}
          </p>
        </CardContent>
      </Card>

      <EditStaffDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        staff={staff}
      />
    </div>
  );
};

export default StaffDetails;
