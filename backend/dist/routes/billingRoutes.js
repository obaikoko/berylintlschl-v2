"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const billingController_1 = require("../controllers/billingController");
const router = express_1.default.Router();
router.route("/").get(authMiddleware_1.protect, authMiddleware_1.admin, billingController_1.listInvoices).post(authMiddleware_1.protect, authMiddleware_1.admin, billingController_1.createInvoice);
router.route("/reports/summary").get(authMiddleware_1.protect, authMiddleware_1.admin, billingController_1.reportSummary);
router.route("/reports/statement").get(authMiddleware_1.protect, authMiddleware_1.admin, billingController_1.studentStatement);
router.route("/:id").put(authMiddleware_1.protect, authMiddleware_1.admin, billingController_1.updateInvoice).delete(authMiddleware_1.protect, authMiddleware_1.admin, billingController_1.deleteInvoice);
router.route("/payments").post(authMiddleware_1.protect, authMiddleware_1.admin, billingController_1.recordPayment);
router.route("/:id/receipt").get(authMiddleware_1.protect, authMiddleware_1.admin, billingController_1.exportInvoiceReceipt);
exports.default = router;
