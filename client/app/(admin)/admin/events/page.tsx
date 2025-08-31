'use client';
import EventsTable from '@/components/shared/events/events-table';
import Spinner from '@/components/shared/spinner';
import { Card, CardContent } from '@/components/ui/card';
import { useGetEventsQuery } from '@/src/features/events/eventApiSlice';

const EventsPage = () => {
  const { data, isLoading, isError } = useGetEventsQuery();

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
        <h2 className='text-2xl font-bold mb-1'>Events Summary</h2>
        <p className='text-sm opacity-90'>List of uploaded events.</p>
      </div>
      <EventsTable events={data} />
    </>
  );
};

export default EventsPage;
