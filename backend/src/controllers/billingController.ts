import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../config/db/prisma";
import { generateInvoiceReceiptPdf } from "../utils/generateStudentPdf";
import { generateInvoiceReceiptHtml } from "../utils/generateInvoiceReceiptHtml";
import {
  createInvoiceSchema,
  updateInvoiceSchema,
  recordPaymentSchema,
  listInvoicesQuerySchema,
  reportSummaryQuerySchema,
  studentStatementQuerySchema,
} from "../validators/billingValidators";

const createInvoice = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, term, session, items } = createInvoiceSchema.parse(
    req.body
  );

  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  const totalAmount = items.reduce((sum, it) => sum + Number(it.amount), 0);

  const invoice = await prisma.invoice.create({
    data: {
      studentId,
      term,
      session,
      balance: totalAmount,
      totalAmount,
      status: "unpaid",
      items: {
        create: items.map((it) => ({ name: it.name, amount: it.amount })),
      },
    },
    include: { items: true, payments: true, student: true },
  });

  res.status(201).json(invoice);
});

const updateInvoice = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = updateInvoiceSchema.parse(req.body);

  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) {
    res.status(404);
    throw new Error("Invoice not found");
  }

  if (payload.items) {
    await prisma.feeItem.deleteMany({ where: { invoiceId: id } });
    await prisma.feeItem.createMany({
      data: payload.items.map((it) => ({
        invoiceId: id,
        name: it.name,
        amount: Number(it.amount),
      })),
    });
  }

  const items = await prisma.feeItem.findMany({ where: { invoiceId: id } });
  const recomputedTotal = items.reduce((sum, it) => sum + Number(it.amount), 0);

  const updated = await prisma.invoice.update({
    where: { id },
    data: {
      term: payload.term ?? invoice.term,
      session: payload.session ?? invoice.session,
      balance: recomputedTotal,
      totalAmount: recomputedTotal,
      status: payload.status ?? invoice.status,
    },
    include: { items: true, payments: true, student: true },
  });

  res.status(200).json(updated);
});

const listInvoices = asyncHandler(async (req: Request, res: Response) => {
  const { keyword, studentId, term, session, status, pageNumber } =
    listInvoicesQuerySchema.parse(req.query);

  const page = Number(pageNumber) || 1;
  const pageSize = 30;

  const where: any = {
    ...(keyword && {
      student: {
        OR: [
          { firstName: { contains: keyword, mode: "insensitive" } },
          { lastName: { contains: keyword, mode: "insensitive" } },
          { otherName: { contains: keyword, mode: "insensitive" } },
        ],
      },
    }),
    ...(studentId && { student: { studentId } }),
    ...(term && { term }),
    ...(session && { session }),
    ...(status && { status }),
  };

  const [invoices, totalCount] = await Promise.all([
    prisma.invoice.findMany({
      where,
      include: {
        items: true,
        payments: { include: { recordedBy: true } },
        student: true,
      },
      orderBy: { createdAt: "desc" },
      skip: pageSize * (page - 1),
      take: pageSize,
    }),
    prisma.invoice.count({ where }),
  ]);

  res
    .status(200)
    .json({ invoices, page, totalPages: Math.ceil(totalCount / pageSize) });
});

const recordPayment = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const { invoiceId, amount, method, note, paidAt } = recordPaymentSchema.parse(
    req.body
  );

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { payments: true },
  });
  if (!invoice) {
    res.status(404);
    throw new Error("Invoice not found");
  }

  if (Number(amount) > Number(invoice.balance)) {
    res.status(400);
    throw new Error("Amount is greater than invoice balance");
  }

  const payment = await prisma.payment.create({
    data: {
      invoiceId,
      amount: Number(amount),
      method,
      note: note ?? undefined,
      recordedById: req.user.id,
      paidAt: paidAt ?? undefined,
    },
    include: { recordedBy: true, invoice: true },
  });

  const sumPaid =
    (invoice.payments || []).reduce((s, p) => s + Number(p.amount), 0) +
    Number(amount);
  const newBalance = Number(invoice.totalAmount) - sumPaid;
  let newStatus: "unpaid" | "partial" | "paid" = "unpaid";
  if (sumPaid <= 0) newStatus = "unpaid";
  else if (sumPaid < Number(invoice.totalAmount)) newStatus = "partial";
  else newStatus = "paid";

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { status: newStatus, balance: newBalance },
  });

  res.status(201).json(payment);
});

const reportSummary = asyncHandler(async (req: Request, res: Response) => {
  const { startDate, endDate, term, session, level, subLevel } =
    reportSummaryQuerySchema.parse(req.query);

  const paymentWhere: any = {
    ...(startDate || endDate ? { paidAt: {} as any } : {}),
  };
  if (startDate) paymentWhere.paidAt.gte = startDate;
  if (endDate) paymentWhere.paidAt.lte = endDate;

  const payments = await prisma.payment.findMany({
    where: paymentWhere,
    include: {
      recordedBy: true,
      invoice: {
        include: {
          student: true,
        },
      },
    },
  });

  const filtered = payments.filter((p) => {
    const inv = p.invoice;
    if (term && inv.term !== term) return false;
    if (session && inv.session !== session) return false;
    if (level && inv.student.level !== level) return false;
    if (subLevel && inv.student.subLevel !== subLevel) return false;
    return true;
  });

  const totalCollected = filtered.reduce((s, p) => s + Number(p.amount), 0);
  const byMethod: Record<string, number> = {};
  const byRecorder: Record<string, number> = {};

  for (const p of filtered) {
    byMethod[p.method] = (byMethod[p.method] || 0) + Number(p.amount);
    const recorderName =
      `${p.recordedBy.firstName} ${p.recordedBy.lastName}`.trim();
    byRecorder[recorderName] =
      (byRecorder[recorderName] || 0) + Number(p.amount);
  }

  res
    .status(200)
    .json({ totalCollected, byMethod, byRecorder, count: filtered.length });
});

const studentStatement = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, term, session } = studentStatementQuerySchema.parse(
    req.query
  );

  const whereInv: any = { studentId };
  if (term) whereInv.term = term;
  if (session) whereInv.session = session;

  const invoices = await prisma.invoice.findMany({
    where: whereInv,
    include: { items: true, payments: { include: { recordedBy: true } } },
    orderBy: { createdAt: "desc" },
  });

  const statement = invoices.map((inv) => {
    const paid = inv.payments.reduce((s, p) => s + Number(p.amount), 0);
    const balance = Number(inv.totalAmount) - paid;
    return { ...inv, paid, balance };
  });

  const totals = statement.reduce(
    (acc, inv) => {
      acc.totalInvoiced += Number(inv.totalAmount);
      acc.totalPaid += inv.paid;
      acc.totalBalance += inv.balance;
      return acc;
    },
    { totalInvoiced: 0, totalPaid: 0, totalBalance: 0 }
  );

  res.status(200).json({ statement, totals });
});

const exportInvoiceReceipt = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        items: true,
        payments: { include: { recordedBy: true } },
        student: true,
      },
    });

    if (!invoice) {
      res.status(404);
      throw new Error("Invoice not found");
    }

    const html = generateInvoiceReceiptHtml(invoice as any);
    const pdfBuffer = await generateInvoiceReceiptPdf(html);

    const fileName = `invoice-${invoice.id}.pdf`;
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    });
    res.send(pdfBuffer);
  }
);

// @desc Delete invoice
// @route DELETE /api/billing/invoices/:id
// @privacy Private SUPER ADMIN
const deleteInvoice = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user.superAdmin) {
    res.status(401);
    throw new Error("Forbidden! You are not authorized to delete this invoice");
  }
  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) {
    res.status(404);
    throw new Error("Invoice not found");
  }
  await prisma.invoice.delete({ where: { id } });
  res.status(200).json({ message: "Invoice deleted successfully" });
});

export {
  exportInvoiceReceipt,
  createInvoice,
  updateInvoice,
  listInvoices,
  recordPayment,
  reportSummary,
  studentStatement,
  deleteInvoice,
};
