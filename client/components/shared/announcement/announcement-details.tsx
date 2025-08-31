'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SpeakerIcon } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import { useGetAnnouncementByIdQuery } from '@/src/features/announcement/announcementApiSlice';
import Spinner from '../spinner';
const AnnouncementDetails = ({ annoucementId }: { annoucementId: string }) => {
  console.log(annoucementId);
  const { data, isLoading, isError } =
    useGetAnnouncementByIdQuery(annoucementId);

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <CardDescription className='mt-12 text-center'>
            <Spinner />
            Loading...
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card>
        <CardContent>
          <CardDescription className='mt-12 text-center text-destructive'>
            Failed to load announcement data. Please try again.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }
  const { title, message, target, createdAt } = data;

  return (
    <div className='max-w-3xl mx-auto px-4 py-10'>
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-2xl font-semibold'>
            <SpeakerIcon className='w-5 h-5 text-primary' />
            {title}
          </CardTitle>
          <div className='flex justify-between items-center mt-2 text-sm text-muted-foreground'>
            <span>{formatDateTime(createdAt)}</span>
            <Badge variant='secondary'>{target}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className='whitespace-pre-wrap text-base leading-relaxed text-muted-foreground'>
            {message}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementDetails;
