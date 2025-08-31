import SatffDetails from '@/components/shared/staff/staff-details';

const StaffProfilePage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  return (
    <>
      <SatffDetails staffId={id} />
    </>
  );
};

export default StaffProfilePage;
