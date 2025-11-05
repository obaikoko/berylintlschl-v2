import { z } from "zod";

export const createInvoiceSchema = z.object({
  studentId: z.string().min(5, "studentId is required"),
  term: z.string().min(1, "term is required"),
  session: z.string().min(3, "session is required"),
  items: z
    .array(
      z.object({
        name: z.string().min(1, "item name is required"),
        amount: z.coerce.number().min(0, "amount must be >= 0"),
      })
    )
    .min(1, "at least one item is required"),
});

export const updateInvoiceSchema = z.object({
  term: z.string().optional(),
  session: z.string().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  items: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        amount: z.coerce.number().min(0),
      })
    )
    .optional(),
  status: z.enum(["unpaid", "partial", "paid"]).optional(),
});

export const recordPaymentSchema = z.object({
  invoiceId: z.string().min(5, "invoiceId is required"),
  amount: z.coerce.number().positive("amount must be > 0"),
  method: z.enum(["cash", "transfer", "POS", "cheque"]).default("cash"),
  note: z.string().optional(),
  paidAt: z.coerce.date().optional(),
});

export const listInvoicesQuerySchema = z.object({
  keyword: z.string().optional(),
  studentId: z.string().optional(),
  term: z.string().optional(),
  session: z.string().optional(),
  status: z.enum(["unpaid", "partial", "paid"]).optional(),
  pageNumber: z.coerce.number().optional(),
});

export const reportSummaryQuerySchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  term: z.string().optional(),
  session: z.string().optional(),
  level: z.string().optional(),
  subLevel: z.string().optional(),
});

export const studentStatementQuerySchema = z.object({
  studentId: z.string().min(5, "studentId is required"),
  term: z.string().optional(),
  session: z.string().optional(),
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type RecordPaymentInput = z.infer<typeof recordPaymentSchema>;
