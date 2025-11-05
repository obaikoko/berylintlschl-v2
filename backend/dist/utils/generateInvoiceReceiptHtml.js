"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoiceReceiptHtml = generateInvoiceReceiptHtml;
const formatUtils_1 = require("./formatUtils");
function generateInvoiceReceiptHtml(inv) {
    const paid = (inv.payments || []).reduce((s, p) => s + Number(p.amount), 0);
    const balance = Number(inv.balance);
    const studentName = inv.student
        ? `${inv.student.firstName} ${inv.student.lastName}`
        : inv.studentId;
    const studentLevel = inv.student
        ? `${inv.student.level} ${inv.student.subLevel}`
        : inv.studentId;
    const createdAt = (0, formatUtils_1.formatDateAndTime)(inv.createdAt);
    const itemsRows = inv.items
        .map((it) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(it.name)}</td>
          <td style="padding:8px;text-align:right;border-bottom:1px solid #eee;">${(0, formatUtils_1.formatCurrency)(it.amount)}</td>
        </tr>`)
        .join("");
    const paymentsRows = (inv.payments || [])
        .map((p) => {
        var _a, _b;
        return `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee; td:nth-child(5) {
  color: #555;
  font-style: italic;
  max-width: 250px;
  word-wrap: break-word;
}
">${p.paidAt ? (0, formatUtils_1.formatDateAndTime)(p.paidAt) : "-"}</td>
        <td style="padding:8px;text-align:right;border-bottom:1px solid #eee;">${(0, formatUtils_1.formatCurrency)(p.amount)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(p.method)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(((((_a = p.recordedBy) === null || _a === void 0 ? void 0 : _a.firstName) || "") +
            " " +
            (((_b = p.recordedBy) === null || _b === void 0 ? void 0 : _b.lastName) || "")).trim())}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;color:#555;font-style:italic;">
          ${p.note ? escapeHtml(p.note) : "-"}
        </td>
      </tr>`;
    })
        .join("");
    return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Invoice ${inv.id}</title>
    <style>
      body { font-family: Arial, Helvetica, sans-serif; color: #111; }
      .container { max-width: 800px; margin: 0 auto; padding: 24px; }
      .header { display: flex; justify-content: space-between; align-items: center; }
      .brand { font-weight: 700; font-size: 20px; }
      .muted { color: #666; }
      .section { margin-top: 24px; }
      table { width: 100%; border-collapse: collapse; }
      h2 { margin: 0 0 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div>
          <div class="brand">${process.env.SCHOOL_NAME}</div>
          <div class="muted">Invoice Receipt</div>
        </div>
        <div style="text-align:right;">
          <div><strong>Invoice:</strong> ${inv.id}</div>
          <div><strong>Date:</strong> ${createdAt}</div>
        </div>
      </div>

      <div class="section">
        <h2>Student</h2>
        <div><strong>Name:</strong> ${escapeHtml(studentName)}</div>
        <div><strong>Class:</strong> ${escapeHtml(studentLevel)}</div>
        <div><strong>Term/Session:</strong> ${escapeHtml(inv.term)} Term, ${escapeHtml(inv.session)}</div>
        <div><strong>Payment Status:</strong> ${escapeHtml(inv.status)}</div>
      </div>

      <div class="section">
        <h2>Items</h2>
        <table>
          <thead>
            <tr>
              <th style="text-align:left;padding:8px;border-bottom:1px solid #ccc;">Description</th>
              <th style="text-align:right;padding:8px;border-bottom:1px solid #ccc;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
            <tr>
              <td style="padding:8px;text-align:right;"><strong>Total</strong></td>
              <td style="padding:8px;text-align:right;">${(0, formatUtils_1.formatCurrency)(inv.totalAmount)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>Payments</h2>
        <table>
       <thead>
  <tr>
    <th style="text-align:left;padding:8px;border-bottom:1px solid #ccc;">Date</th>
    <th style="text-align:right;padding:8px;border-bottom:1px solid #ccc;">Amount</th>
    <th style="text-align:left;padding:8px;border-bottom:1px solid #ccc;">Method</th>
    <th style="text-align:left;padding:8px;border-bottom:1px solid #ccc;">Recorded By</th>
    <th style="text-align:left;padding:8px;border-bottom:1px solid #ccc;">Note</th>
  </tr>
</thead>

          <tbody>
            ${paymentsRows ||
        '<tr><td colspan="4" style="padding:8px;" class="muted">No payments recorded</td></tr>'}
          </tbody>
        </table>
        <div style="margin-top:12px;text-align:right;">
            <div><strong>Paid:</strong> ${(0, formatUtils_1.formatCurrency)(paid)}</div>
            ${balance > 0
        ? `<div><strong>Balance:</strong> ${(0, formatUtils_1.formatCurrency)(balance)}</div>`
        : ""}
          
        </div>
      </div>
      

      <div class="section muted" style="font-size:12px;">
        This receipt is computer generated and does not require a signature.
      </div>
    </div>
  </body>
  </html>
`;
}
function escapeHtml(s) {
    return String(s || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
