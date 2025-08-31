'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { useGetStudentProfileQuery } from '@/src/features/students/studentApiSlice';
import { formatDateTime } from '@/lib/utils';
import { ChangeStudentPassword } from '@/components/shared/students/student-change-password-button';

const StudentProfilePage = () => {
  const { data: student, isLoading, isError } = useGetStudentProfileQuery();

  if (isLoading) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent>Loading Student data...</CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent>Failed to load Student data.</CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <h1 className='text-3xl font-semibold'>Student Profile</h1>
      <Card>
        <CardContent className='p-6 flex gap-6'>
          {student.imageUrl ? (
            <Image
              className='rounded'
              width={150}
              height={120}
              alt='Image'
              src={`${student.imageUrl}`}
            />
          ) : (
            <Avatar className='w-24 h-24'>
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${student.lastName}+${student.firstName}`}
              />
              <AvatarFallback>
                {student.firstName[0]}
                {student.lastName[0]}
              </AvatarFallback>
            </Avatar>
          )}

          <div className='space-y-1'>
            <h2 className='text-xl font-medium'>
              {student.lastName} {student.firstName} {student.otherName}
            </h2>
            <p className='text-sm text-muted-foreground'>
              ID: {student.studentId}
            </p>
            <p className='text-sm'>Gender: {student.gender}</p>
            <p className='text-sm'>
              Date of Birth: {formatDateTime(student.dateOfBirth)}
            </p>
            <p className='text-sm'>
              Level: {student.level} - {student.subLevel}
            </p>
            <p className='text-sm'>
              Admitted: {formatDateTime(student.yearAdmitted)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <p>
              <strong>State of Origin:</strong> {student.stateOfOrigin}
            </p>
            <p>
              <strong>Local Govt:</strong> {student.localGvt}
            </p>
            <p>
              <strong>Home Town:</strong> {student.homeTown}
            </p>
            <p>
              <strong>Fees Paid:</strong> {student.isPaid ? 'Yes' : 'No'}
            </p>
            <p>
              <strong> Student:</strong> {student.isStudent ? 'Yes' : 'No'}
            </p>
          </div>
          <div className='space-y-2'>
            <p>
              <strong>Sponsor Name:</strong> {student.sponsorName}
            </p>
            <p>
              <strong>Email:</strong> {student.sponsorEmail}
            </p>
            <p>
              <strong>Phone:</strong> {student.sponsorPhoneNumber}
            </p>
            <p>
              <strong>Relationship:</strong> {student.sponsorRelationship}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <p className='text-sm text-muted-foreground text-left'>
            Registered On: {formatDateTime(student.createdAt)}
          </p>
          <p className='text-sm text-muted-foreground text-left'>
            Last Modified: {formatDateTime(student.updatedAt)}
          </p>
          <ChangeStudentPassword studentId={student.studentId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfilePage;
