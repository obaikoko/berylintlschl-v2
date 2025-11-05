"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateInvoiceMutation } from "@/src/features/billing/billingApiSlice";
import { toast } from "sonner";
import { invoiceItems, sessions, showZodErrors, terms } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ItemRow = { name: string; amount: string };

interface CreateInvoiceDialogProps {
  open: boolean;
  onClose: () => void;
  studentId: string;
}

const CreateInvoiceDialog = ({
  open,
  onClose,
  studentId,
}: CreateInvoiceDialogProps) => {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const [session, setSession] = useState("");
  const [items, setItems] = useState<ItemRow[]>([{ name: "", amount: "" }]);
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();

  const addItem = () => setItems((prev) => [...prev, { name: "", amount: "" }]);
  const removeItem = (idx: number) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));

  const updateItem = (idx: number, key: "name" | "amount", value: string) => {
    setItems((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, [key]: value } : it))
    );
  };

  const submit = async () => {
    try {
      const payload = {
        studentId: studentId.trim(),
        term: term.trim(),
        session: session.trim(),
        items: items
          .filter((it) => it.name && it.amount)
          .map((it) => ({
            name: it.name.trim(),
            amount: Number(it.amount),
          })),
      };

      const res = await createInvoice(payload).unwrap();
      toast.success("Invoice created successfully!");
      onClose(); // Close the dialog
      router.push(`/admin/billing/${res.id}`);
    } catch (error) {
      showZodErrors(error);
    }
  };

  const canSubmit =
    studentId &&
    term &&
    session &&
    items.some((it) => it.name && Number(it.amount) > 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>ID: {studentId}</DialogDescription>
          <DialogDescription>
            Fill out invoice details and click &quot;Create Invoice&quot; to
            continue.
          </DialogDescription>
        </DialogHeader>

        {/* Invoice Form */}
        <div className="space-y-4 mt-4">
          {/* Term & Session Selects */}
          <Card>
            <CardContent className="flex flex-col md:flex-row gap-x-3">
              <Select onValueChange={setTerm}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Term" />
                </SelectTrigger>
                <SelectContent>
                  {terms.map((trm, index) => (
                    <SelectItem key={index} value={trm}>
                      {trm}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={setSession}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((sess, index) => (
                    <SelectItem key={index} value={sess}>
                      {sess}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Fee Items */}
          <Card>
            <CardContent className="p-4 space-y-3 max-h-80 overflow-y-auto">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Fee Items</div>
                <Button variant="outline" size="sm" onClick={addItem}>
                  Add Item
                </Button>
              </div>

              <div className="space-y-2">
                {items.map((it, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-3 gap-2"
                  >
                    {/* Select for Item Name */}
                    <Select
                      value={it.name}
                      onValueChange={(value) => updateItem(idx, "name", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Fee Item" />
                      </SelectTrigger>
                      <SelectContent>
                        {invoiceItems.map((invoiceItem, index) => (
                          <SelectItem key={index} value={invoiceItem}>
                            {invoiceItem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Input for Amount */}
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={it.amount}
                      onChange={(e) =>
                        updateItem(idx, "amount", e.target.value)
                      }
                    />

                    {/* Remove Button */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        className="text-red-700 hover:text-red-300"
                        onClick={() => removeItem(idx)}
                        disabled={items.length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={!canSubmit || isLoading}>
            {isLoading ? "Creating..." : "Create Invoice"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
