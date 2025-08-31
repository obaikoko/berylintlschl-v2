'use client';
import { EventSchema } from '@/schemas/eventSchema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime,  } from '@/lib/utils';

import DeleteEventButton from './delete-event-button';
import EditEventDialog from './edit-event-dialog';

const EventsTable = ({ events }: { events: EventSchema[] }) => {
  return (
    <div className='max-h-[400px] overflow-y-auto border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events && events.length === 0 ? (
            <>
              {events.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className='text-center py-4 text-muted-foreground'
                  >
                    No events found.
                  </TableCell>
                </TableRow>
              )}
            </>
          ) : (
            <>
              {events &&
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>...{event.id.slice(18, 25)}</TableCell>
                    <TableCell className='   capitalize'>
                      {event.title}
                    </TableCell>
                    <TableCell className='   capitalize'>
                      {event.description.slice(0, 15)}...
                    </TableCell>
                    <TableCell>{formatDateTime(event.date)}</TableCell>
                    <TableCell>{formatDateTime(event.createdAt)}</TableCell>
                    <TableCell>
                      <EditEventDialog event={event} />
                      <DeleteEventButton eventId={event.id} />
                    </TableCell>
                  </TableRow>
                ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventsTable;
