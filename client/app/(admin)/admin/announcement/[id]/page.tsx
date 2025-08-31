import AnnouncementDetails from '@/components/shared/announcement/announcement-details';

const AnnouncementDetailPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  return <AnnouncementDetails annoucementId={id} />;
};

export default AnnouncementDetailPage;
