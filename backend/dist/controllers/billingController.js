"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvoice = exports.studentStatement = exports.reportSummary = exports.recordPayment = exports.listInvoices = exports.updateInvoice = exports.createInvoice = exports.exportInvoiceReceipt = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = require("../config/db/prisma");
const generateStudentPdf_1 = require("../utils/generateStudentPdf");
const generateInvoiceReceiptHtml_1 = require("../utils/generateInvoiceReceiptHtml");
const billingValidators_1 = require("../validators/billingValidators");
const createInvoice = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, term, session, items } = billingValidators_1.createInvoiceSchema.parse(req.body);
    const student = yield prisma_1.prisma.student.findUnique({ where: { id: studentId } });
    if (!student) {
        res.status(404);
        throw new Error("Student not found");
    }
    const totalAmount = items.reduce((sum, it) => sum + Number(it.amount), 0);
    const invoice = yield prisma_1.prisma.invoice.create({
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
}));
exports.createInvoice = createInvoice;
const updateInvoice = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { id } = req.params;
    const payload = billingValidators_1.updateInvoiceSchema.parse(req.body);
    const invoice = yield prisma_1.prisma.invoice.findUnique({ where: { id } });
    if (!invoice) {
        res.status(404);
        throw new Error("Invoice not found");
    }
    if (payload.items) {
        yield prisma_1.prisma.feeItem.deleteMany({ where: { invoiceId: id } });
        yield prisma_1.prisma.feeItem.createMany({
            data: payload.items.map((it) => ({
                invoiceId: id,
                name: it.name,
                amount: Number(it.amount),
            })),
        });
    }
    const items = yield prisma_1.prisma.feeItem.findMany({ where: { invoiceId: id } });
    const recomputedTotal = items.reduce((sum, it) => sum + Number(it.amount), 0);
    const updated = yield prisma_1.prisma.invoice.update({
        where: { id },
        data: {
            term: (_a = payload.term) !== null && _a !== void 0 ? _a : invoice.term,
            session: (_b = payload.session) !== null && _b !== void 0 ? _b : invoice.session,
            balance: recomputedTotal,
            totalAmount: recomputedTotal,
            status: (_c = payload.status) !== null && _c !== void 0 ? _c : invoice.status,
        },
        include: { items: true, payments: true, student: true },
    });
    res.status(200).json(updated);
}));
exports.updateInvoice = updateInvoice;
const listInvoices = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword, studentId, term, session, status, pageNumber } = billingValidators_1.listInvoicesQuerySchema.parse(req.query);
    const page = Number(pageNumber) || 1;
    const pageSize = 30;
    const where = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (keyword && {
        student: {
            OR: [
                { firstName: { contains: keyword, mode: "insensitive" } },
                { lastName: { contains: keyword, mode: "insensitive" } },
                { otherName: { contains: keyword, mode: "insensitive" } },
            ],
        },
    })), (studentId && { student: { studentId } })), (term && { term })), (session && { session })), (status && { status }));
    const [invoices, totalCount] = yield Promise.all([
        prisma_1.prisma.invoice.findMany({
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
        prisma_1.prisma.invoice.count({ where }),
    ]);
    res
        .status(200)
        .json({ invoices, page, totalPages: Math.ceil(totalCount / pageSize) });
}));
exports.listInvoices = listInvoices;
const recordPayment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401);
        throw new Error("Unauthorized");
    }
    const { invoiceId, amount, method, note, paidAt } = billingValidators_1.recordPaymentSchema.parse(req.body);
    const invoice = yield prisma_1.prisma.invoice.findUnique({
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
    const payment = yield prisma_1.prisma.payment.create({
        data: {
            invoiceId,
            amount: Number(amount),
            method,
            note: note !== null && note !== void 0 ? note : undefined,
            recordedById: req.user.id,
            paidAt: paidAt !== null && paidAt !== void 0 ? paidAt : undefined,
        },
        include: { recordedBy: true, invoice: true },
    });
    const sumPaid = (invoice.payments || []).reduce((s, p) => s + Number(p.amount), 0) +
        Number(amount);
    const newBalance = Number(invoice.totalAmount) - sumPaid;
    let newStatus = "unpaid";
    if (sumPaid <= 0)
        newStatus = "unpaid";
    else if (sumPaid < Number(invoice.totalAmount))
        newStatus = "partial";
    else
        newStatus = "paid";
    yield prisma_1.prisma.invoice.update({
        where: { id: invoiceId },
        data: { status: newStatus, balance: newBalance },
    });
    res.status(201).json(payment);
}));
exports.recordPayment = recordPayment;
const reportSummary = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, term, session, level, subLevel } = billingValidators_1.reportSummaryQuerySchema.parse(req.query);
    const paymentWhere = Object.assign({}, (startDate || endDate ? { paidAt: {} } : {}));
    if (startDate)
        paymentWhere.paidAt.gte = startDate;
    if (endDate)
        paymentWhere.paidAt.lte = endDate;
    const payments = yield prisma_1.prisma.payment.findMany({
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
        if (term && inv.term !== term)
            return false;
        if (session && inv.session !== session)
            return false;
        if (level && inv.student.level !== level)
            return false;
        if (subLevel && inv.student.subLevel !== subLevel)
            return false;
        return true;
    });
    const totalCollected = filtered.reduce((s, p) => s + Number(p.amount), 0);
    const byMethod = {};
    const byRecorder = {};
    for (const p of filtered) {
        byMethod[p.method] = (byMethod[p.method] || 0) + Number(p.amount);
        const recorderName = `${p.recordedBy.firstName} ${p.recordedBy.lastName}`.trim();
        byRecorder[recorderName] =
            (byRecorder[recorderName] || 0) + Number(p.amount);
    }
    res
        .status(200)
        .json({ totalCollected, byMethod, byRecorder, count: filtered.length });
}));
exports.reportSummary = reportSummary;
const studentStatement = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, term, session } = billingValidators_1.studentStatementQuerySchema.parse(req.query);
    const whereInv = { studentId };
    if (term)
        whereInv.term = term;
    if (session)
        whereInv.session = session;
    const invoices = yield prisma_1.prisma.invoice.findMany({
        where: whereInv,
        include: { items: true, payments: { include: { recordedBy: true } } },
        orderBy: { createdAt: "desc" },
    });
    const statement = invoices.map((inv) => {
        const paid = inv.payments.reduce((s, p) => s + Number(p.amount), 0);
        const balance = Number(inv.totalAmount) - paid;
        return Object.assign(Object.assign({}, inv), { paid, balance });
    });
    const totals = statement.reduce((acc, inv) => {
        acc.totalInvoiced += Number(inv.totalAmount);
        acc.totalPaid += inv.paid;
        acc.totalBalance += inv.balance;
        return acc;
    }, { totalInvoiced: 0, totalPaid: 0, totalBalance: 0 });
    res.status(200).json({ statement, totals });
}));
exports.studentStatement = studentStatement;
const exportInvoiceReceipt = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const invoice = yield prisma_1.prisma.invoice.findUnique({
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
    const html = (0, generateInvoiceReceiptHtml_1.generateInvoiceReceiptHtml)(invoice);
    const pdfBuffer = yield (0, generateStudentPdf_1.generateInvoiceReceiptPdf)(html);
    const fileName = `invoice-${invoice.id}.pdf`;
    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
    });
    res.send(pdfBuffer);
}));
exports.exportInvoiceReceipt = exportInvoiceReceipt;
// @desc Delete invoice
// @route DELETE /api/billing/invoices/:id
// @privacy Private SUPER ADMIN
const deleteInvoice = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.user.superAdmin) {
        res.status(401);
        throw new Error("Forbidden! You are not authorized to delete this invoice");
    }
    const invoice = yield prisma_1.prisma.invoice.findUnique({ where: { id } });
    if (!invoice) {
        res.status(404);
        throw new Error("Invoice not found");
    }
    yield prisma_1.prisma.invoice.delete({ where: { id } });
    res.status(200).json({ message: "Invoice deleted successfully" });
}));
exports.deleteInvoice = deleteInvoice;
