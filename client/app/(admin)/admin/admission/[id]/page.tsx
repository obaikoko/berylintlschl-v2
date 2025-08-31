import AdmissionDetails from '@/components/shared/admission/admission-details';

const AdmissionDetailsPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  return (
    <>
      <AdmissionDetails requestId={id} />
    </>
  );
};

export default AdmissionDetailsPage;

