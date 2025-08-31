'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { useGetAllAdmissionQuery } from '@/src/features/admission/admissionApiSlice';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import Spinner from '@/components/shared/spinner';
import { formatDateTime } from '@/lib/utils';
import { AdmissionSchema } from '@/schemas/admissionSchema';
import { Badge } from '@/components/ui/badge';

import DeleteAdmissionButton from '@/components/shared/admission/delete-admission-button';

export default function AdmissionRequestPage() {
  const { data, isLoading, isError } = useGetAllAdmissionQuery({});
  const requests: AdmissionSchema[] = data?.admission ?? [];

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            Admission Requests
            {requests.length > 0 && (
              <Badge variant='secondary'>{requests.length}</Badge>
            )}
          </CardTitle>
          <CardDescription>
            View and manage all recent admission requests submitted by
            prospective students.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex flex-col items-center justify-center py-6'>
              <Spinner />
              <p className='mt-2 text-muted-foreground'>
                Loading admission requests...
              </p>
            </div>
          ) : isError || !data ? (
            <div className='py-6 text-center text-red-500'>
              Failed to load requests. Please try again.
            </div>
          ) : (
            <div className='max-h-[500px] overflow-y-auto border rounded-md'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.length > 0 ? (
                    requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <Link
                            href={`/admin/admission/${request.id}`}
                            className='text-primary underline'
                          >
                            {request.firstName}
                          </Link>
                        </TableCell>
                        <TableCell>{request.lastName}</TableCell>
                        <TableCell>{request.gender}</TableCell>
                        <TableCell>{request.level}</TableCell>
                        <TableCell>
                          {formatDateTime(request.createdAt)}
                        </TableCell>
                        <TableCell>
                          <DeleteAdmissionButton admissionId={request.id} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className='py-4 text-center text-muted-foreground'
                      >
                        No admission requests found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
