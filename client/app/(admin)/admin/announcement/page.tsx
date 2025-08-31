'use client';
import AnnouncementTable from '@/components/shared/announcement/announcement-table';
import Spinner from '@/components/shared/spinner';
import { Card, CardContent } from '@/components/ui/card';
import { useGetAllAnnouncementQuery } from '@/src/features/announcement/announcementApiSlice';

const AnnouncementsPage = () => {
  const { data, isLoading, isError } = useGetAllAnnouncementQuery({});

  if (isLoading)
    return (
      <Card>
        <CardContent>
          <Spinner />
          Loading events...
        </CardContent>
      </Card>
    );
  if (isError || !data)
    return (
      <div>
        <Card>
          <CardContent>No events found or an error occured.</CardContent>
        </Card>
      </div>
    );

  return (
    <>
      <div className=' p-6'>
        <h2 className='text-2xl font-bold mb-1'>Announcement Summary</h2>
        <p className='text-sm opacity-90'>List of uploaded announcements.</p>
      </div>
      <AnnouncementTable announcements={data} />
    </>
  );
};

export default AnnouncementsPage;
