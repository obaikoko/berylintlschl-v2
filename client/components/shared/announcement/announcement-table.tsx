'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/lib/utils';

import DeleteAnnouncementButton from './delete-announcement-button';
import EditAnnouncementDialog from './edit-announcement-dialog';
import { AnnouncementSchema } from '@/schemas/announcement';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const AnnouncementTable = ({
  announcements,
}: {
  announcements: AnnouncementSchema[];
}) => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div className='max-h-[400px] overflow-y-auto border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            {pathName === '/admin/announcement' && <TableHead>ID</TableHead>}

            <TableHead>Title</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Created On</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {announcements && announcements.length === 0 ? (
            <>
              {announcements.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className='text-center py-4 text-muted-foreground'
                  >
                    No announcements found.
                  </TableCell>
                </TableRow>
              )}
            </>
          ) : (
            <>
              {announcements &&
                announcements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    {pathName === '/admin/announcement' && (
                      <TableCell className='underline'>
                        <Link href={`/admin/announcement/${announcement.id}`}>
                          ...{announcement.id.slice(18, 25)}
                        </Link>
                      </TableCell>
                    )}

                    <TableCell className='capitalize'>
                      {announcement.title}
                    </TableCell>
                    <TableCell className='capitalize'>
                      {announcement.message.slice(0, 15)}...
                    </TableCell>
                    <TableCell>{announcement.target}</TableCell>
                    <TableCell>
                      {formatDateTime(announcement.createdAt)}
                    </TableCell>

                    {pathName === '/admin/announcement' ? (
                      <TableCell>
                        <EditAnnouncementDialog announcement={announcement} />{' '}
                        <DeleteAnnouncementButton
                          announcementId={announcement.id}
                        />
                      </TableCell>
                    ) : (
                      <TableCell>
                        {pathName === '/admin/announcement' ? (
                          <Button
                            onClick={() =>
                              router.push(
                                `/admin/announcement/${announcement.id}`
                              )
                            }
                          >
                            Read More
                          </Button>
                        ) : pathName === '/user/announcement' ? (
                          <Button
                            onClick={() =>
                              router.push(
                                `/user/announcement/${announcement.id}`
                              )
                            }
                          >
                            Read More
                          </Button>
                        ) : (
                          <Button
                            className='cursor-pointer'
                            onClick={() =>
                              router.push(
                                `/student/announcement/${announcement.id}`
                              )
                            }
                          >
                            Read More
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnnouncementTable;
