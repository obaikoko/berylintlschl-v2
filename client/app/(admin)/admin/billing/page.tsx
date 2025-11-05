"use client";
import { useState } from "react";
import Link from "next/link";
import { useListInvoicesQuery } from "@/src/features/billing/billingApiSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sessions, terms } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const BillingListPage = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [term, setTerm] = useState("");
  const [session, setSession] = useState("");

  const { data, isLoading, isError, refetch } = useListInvoicesQuery({
    studentId: studentId || undefined,
    keyword: name || undefined,
    status: status || undefined,
    term: term || undefined,
    session: session || undefined,
  });


  return (
    <div className="wrapper py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Billing - Invoices</h1>
          <p className="text-sm text-muted-foreground">
            View and manage invoices. Filter by student, term, session, and
            status.
          </p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
          <Input
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
              {sessions.map((session, index) => (
                <SelectItem key={index} value={session}>
                  {session}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => setStatus(v)} value={status}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => refetch()}>Apply Filters</Button>
        </CardContent>
      </Card>

      {isLoading && <p>Loading invoices...</p>}
      {isError && <p className="text-red-600">Failed to load invoices.</p>}
      

      {data && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-3 pr-4">Invoice</th>
                <th className="py-3 pr-4">Student</th>
                <th className="py-3 pr-4">Term/Session</th>
                <th className="py-3 pr-4">Total</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.invoices.map((inv) => (
                <tr key={inv.id} className="border-b hover:bg-muted/30">
                  <td className="py-3 pr-4">{inv.id}</td>
                  <td className="py-3 pr-4">
                    {inv.student
                      ? `${inv.student.firstName} ${inv.student.lastName}`
                      : inv.studentId}
                  </td>
                  <td className="py-3 pr-4">
                    {inv.term} / {inv.session}
                  </td>
                  <td className="py-3 pr-4">
                    ₦{Number(inv.totalAmount).toLocaleString()}
                  </td>
                  <td className="py-3 pr-4 capitalize">{inv.status}</td>
                  <td className="py-3 pr-4">
                    <Link href={`/admin/billing/${inv.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BillingListPage;
