'use client';

import { Button } from '@/components/ui/button';
import {
  useGetResultQuery,
  useResultPaymentMutation,
} from '@/src/features/results/resultApiSlice';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';

const UpdateResultPaymentButton = ({ resultId }: { resultId: string }) => {
  const { data: resultData, refetch } = useGetResultQuery(resultId, {
    skip: !resultId,
  });

  const [updatePayment, { isLoading }] = useResultPaymentMutation();

  const handlePaymentSettings = async () => {
    if (!resultId || !resultData) return;

    try {
      const status = resultData.isPaid ? false : true;
      const res = await updatePayment({ resultId, resultFee: status }).unwrap();

      if (res) {
        refetch();
        toast.success(res);
      }
    } catch (error) {
      showZodErrors(error);
    }
  };

  return (
    <div>
      <Button
        onClick={handlePaymentSettings}
        disabled={isLoading}
        size='sm'
        className='cursor-pointer'
        variant={resultData?.isPaid ? 'destructive' : 'outline'}
      >
        {isLoading
          ? 'Processing...'
          : resultData?.isPaid
          ? 'Lock Result'
          : 'Unlock Result'}
      </Button>
    </div>
  );
};

export default UpdateResultPaymentButton;
