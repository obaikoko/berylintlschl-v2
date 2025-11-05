'use client';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useListInvoicesQuery, useRecordPaymentMutation, useDeleteInvoiceMutation } from '@/src/features/billing/billingApiSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showZodErrors } from '@/lib/utils';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import Spinner from '@/components/shared/spinner';
import { useRouter } from 'next/navigation';
const InvoiceDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, isError, refetch } = useListInvoicesQuery({});
  const invoice = useMemo(() => data?.invoices.find((i) => i.id === id), [data, id]);

  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<string>('cash');
  const [note, setNote] = useState('');
  const [recordPayment, { isLoading: isRecording }] = useRecordPaymentMutation();
  const [deleteInvoice, { isLoading: isDeleting }] = useDeleteInvoiceMutation();
  const paid = (invoice?.payments || []).reduce((s, p) => s + Number(p.amount), 0);
  const balance = Math.max(0, Number(invoice?.totalAmount || 0) - paid);

  const submitPayment = async () => {
    if (!invoice) return;
    try {
      
      const res = await recordPayment({ invoiceId: invoice.id, amount: Number(amount), method, note: note || undefined });
      console.log(res.error);
      if (res.error) {
showZodErrors(res.error);
        return;
      }
      toast.success('Payment recorded successfully');
     setAmount('');
     setNote('');
     refetch();
    } catch (error) {
showZodErrors(error);
toast.error('Failed to record payment');
      
    }
    
  };

  if (isLoading) return <div className="wrapper py-8">Loading...</div>;
  if (isError) return <div className="wrapper py-8 text-red-600">Failed to load invoice.</div>;
  if (!invoice) return <div className="wrapper py-8">Invoice not found.</div>;

  const printInvoicePdf = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const url = `${baseUrl}/api/billing/${invoice.id}/receipt`;

  // Show loading toast
  const toastId = toast.loading('Generating receipt PDF, please wait...');

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/pdf' },
      credentials: 'include',
    });

    if (!res.ok) {
      let errorMessage = 'Failed to generate receipt PDF';
      try {
        const errData = await res.json();
        if (errData?.message) errorMessage = errData.message;
      } catch {
        const text = await res.text();
        if (text) errorMessage = text;
      }
      toast.error(errorMessage, { id: toastId });
      return;
    }

    const blob = await res.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `invoice-${invoice.id}.pdf`;
    link.click();
    window.URL.revokeObjectURL(link.href);

    toast.success('Receipt PDF downloaded successfully!', { id: toastId });
  } catch (error) {
    console.error(error);
    toast.error('An unexpected error occurred while generating PDF.', { id: toastId });
  } finally {
    toast.dismiss(toastId); 
  }
};


  const handleDeleteInvoice = async () => {
    try {
      await deleteInvoice(invoice.id).unwrap();
      toast.success('Invoice deleted successfully');
      refetch();
      router.push('/admin/billing');
    } catch (error) {
      showZodErrors(error);
    }
  };

  return (
    <div className="wrapper py-8 space-y-6">
      <div>
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
  <p className="text-sm md:text-3xl font-bold">Invoice #{invoice.id}</p>
  <div className="flex items-center gap-2">
    <Button variant="outline" onClick={printInvoicePdf}>
      Print Receipt (PDF)
    </Button>

    {/* Delete button with confirmation */}
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isDeleting}>
          <Trash2 className="w-4 h-4 mr-1" />
                      {isDeleting ? <Spinner /> : "Delete Invoice"}

        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete this invoice and all related payments.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDeleteInvoice}
          >
            {isDeleting ? <Spinner /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</div>

        <p className="text-sm text-muted-foreground">
          Name:{" "}
          {invoice.student
            ? `${invoice.student.firstName} ${invoice.student.lastName}`
            : invoice.studentId}
        </p>
        <p className="text-sm text-muted-foreground">
          Class:{" "}
          {invoice.student
            ? `${invoice.student.level}${invoice.student.subLevel}`
            : invoice.studentId}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Summary</div>
            <div className="space-y-1 text-sm">
              <div>Total: ₦{Number(invoice.totalAmount).toLocaleString()}</div>
              <div>Paid: ₦{paid.toLocaleString()}</div>
              <div>Balance: ₦{balance.toLocaleString()}</div>
              <div>
                Status: <span className="capitalize">{invoice.status}</span>
              </div>
              <div>
                Term/Session: {invoice.term} Term, {invoice.session}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Items</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((it) => (
                    <tr key={it.id || it.name} className="border-b">
                      <td className="py-2 pr-4">{it.name}</td>
                      <td className="py-2 pr-4">
                        ₦{Number(it.amount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="font-semibold">Record Payment</div>
            <p></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Select value={method} onValueChange={(v) => setMethod(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                  <SelectItem value="POS">POS</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="md:col-span-2"
              />
            </div>
            <Button
              disabled={!amount || Number(amount) <= 0 || isRecording}
              onClick={submitPayment}
            >
              {isRecording ? "Processing..." : "Record Payment"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Payments</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Amount</th>
                    <th className="py-2 pr-4">Method</th>
                    <th className="py-2 pr-4">By</th>
                  </tr>
                </thead>
                <tbody>
                  {(invoice.payments || []).map((p) => (
                    <tr key={p.id} className="border-b">
                      <td className="py-2 pr-4">
                        {p.paidAt ? new Date(p.paidAt).toLocaleString() : "-"}
                      </td>
                      <td className="py-2 pr-4">
                        ₦{Number(p.amount).toLocaleString()}
                      </td>
                      <td className="py-2 pr-4 capitalize">{p.method}</td>
                      <td className="py-2 pr-4">
                        {p.recordedBy
                          ? `${p.recordedBy.firstName} ${p.recordedBy.lastName}`
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceDetailPage;


