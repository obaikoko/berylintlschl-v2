"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoiceReceiptPdf = exports.generateStudentPdf = void 0;
const generatePdfHelper_1 = require("./generatePdfHelper");
const generateStudentPdf = (html) => {
    return (0, generatePdfHelper_1.generatePdf)(html, {
        margin: {
            top: "0.75cm",
            bottom: "0.75cm",
            left: "1cm",
            right: "1cm",
        },
        scale: 0.7,
    });
};
exports.generateStudentPdf = generateStudentPdf;
const generateInvoiceReceiptPdf = (html) => {
    return (0, generatePdfHelper_1.generatePdf)(html, {
        margin: {
            top: "1cm",
            bottom: "1cm",
            left: "1cm",
            right: "1cm",
        },
        scale: 1,
    });
};
exports.generateInvoiceReceiptPdf = generateInvoiceReceiptPdf;
