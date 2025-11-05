"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentStatementQuerySchema = exports.reportSummaryQuerySchema = exports.listInvoicesQuerySchema = exports.recordPaymentSchema = exports.updateInvoiceSchema = exports.createInvoiceSchema = void 0;
const zod_1 = require("zod");
exports.createInvoiceSchema = zod_1.z.object({
    studentId: zod_1.z.string().min(5, "studentId is required"),
    term: zod_1.z.string().min(1, "term is required"),
    session: zod_1.z.string().min(3, "session is required"),
    items: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string().min(1, "item name is required"),
        amount: zod_1.z.coerce.number().min(0, "amount must be >= 0"),
    }))
        .min(1, "at least one item is required"),
});
exports.updateInvoiceSchema = zod_1.z.object({
    term: zod_1.z.string().optional(),
    session: zod_1.z.string().optional(),
    dueDate: zod_1.z.coerce.date().optional().nullable(),
    items: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.string().optional(),
        name: zod_1.z.string(),
        amount: zod_1.z.coerce.number().min(0),
    }))
        .optional(),
    status: zod_1.z.enum(["unpaid", "partial", "paid"]).optional(),
});
exports.recordPaymentSchema = zod_1.z.object({
    invoiceId: zod_1.z.string().min(5, "invoiceId is required"),
    amount: zod_1.z.coerce.number().positive("amount must be > 0"),
    method: zod_1.z.enum(["cash", "transfer", "POS", "cheque"]).default("cash"),
    note: zod_1.z.string().optional(),
    paidAt: zod_1.z.coerce.date().optional(),
});
exports.listInvoicesQuerySchema = zod_1.z.object({
    keyword: zod_1.z.string().optional(),
    studentId: zod_1.z.string().optional(),
    term: zod_1.z.string().optional(),
    session: zod_1.z.string().optional(),
    status: zod_1.z.enum(["unpaid", "partial", "paid"]).optional(),
    pageNumber: zod_1.z.coerce.number().optional(),
});
exports.reportSummaryQuerySchema = zod_1.z.object({
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
    term: zod_1.z.string().optional(),
    session: zod_1.z.string().optional(),
    level: zod_1.z.string().optional(),
    subLevel: zod_1.z.string().optional(),
});
exports.studentStatementQuerySchema = zod_1.z.object({
    studentId: zod_1.z.string().min(5, "studentId is required"),
    term: zod_1.z.string().optional(),
    session: zod_1.z.string().optional(),
});
