'use client';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/lib/utils';
import Spinner from '../spinner';
import { Card, CardContent } from '@/components/ui/card';
import { StaffSchema } from '@/schemas/staffSchema';

const StaffTable = ({
  staff,
  isLoading,
  isError,
}: {
  staff: StaffSchema[];
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isLoading)
    return (
      <Card>
        <CardContent>
          <Spinner />
          Loading staffs...
        </CardContent>
      </Card>
    );
  if (isError)
    return (
      <div>
        <Card>
          <CardContent>Failed to load staffs. Please try again.</CardContent>
        </Card>
      </div>
    );

  return (
    <div className='max-h-[400px] overflow-y-auto border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Name</TableHead>
            <TableHead> Qualification</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date Of Birth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff &&
            staff.map((staffMember) => (
              <TableRow key={staffMember.id}>
                <TableCell className='cursor-pointer text-primary underline'>
                  <Link href={`/admin/staff/${staffMember.id}`}>
                    {staffMember.lastName} {staffMember.firstName}
                  </Link>
                </TableCell>
                <TableCell>{staffMember.qualification}</TableCell>

                <TableCell>{staffMember.gender}</TableCell>
                <TableCell>{staffMember.email}</TableCell>
                <TableCell>{formatDateTime(staffMember.dateOfBirth)}</TableCell>
              </TableRow>
            ))}
          {staff.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className='text-center py-4 text-muted-foreground'
              >
                No staffs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StaffTable;
