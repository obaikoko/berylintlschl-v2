import express from "express";
import { protect, admin } from "../middleware/authMiddleware";
import {
  createInvoice,
  updateInvoice,
  listInvoices,
  recordPayment,
  reportSummary,
  studentStatement,
  exportInvoiceReceipt,
  deleteInvoice,
} from "../controllers/billingController";

const router = express.Router();

router.route("/").get(protect, admin, listInvoices).post(protect, admin, createInvoice);
router.route("/reports/summary").get(protect, admin, reportSummary);
router.route("/reports/statement").get(protect, admin, studentStatement);
router.route("/:id").put(protect, admin, updateInvoice).delete(protect, admin, deleteInvoice);
router.route("/payments").post(protect, admin, recordPayment);
router.route("/:id/receipt").get(protect, admin, exportInvoiceReceipt);

export default router;

