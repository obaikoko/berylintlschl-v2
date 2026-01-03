import { generatePdf } from "./generatePdfHelper";

export const generateStudentPdf = (html: string) => {
  return generatePdf(html, {
    margin: {
      top: "0.75cm",
      bottom: "0.75cm",
      left: "1cm",
      right: "1cm",
    },
    scale: 0.7,
  });
};

export const generateInvoiceReceiptPdf = (html: string) => {
  return generatePdf(html, {
    margin: {
      top: "1cm",
      bottom: "1cm",
      left: "1cm",
      right: "1cm",
    },
    scale: 1,
  });
};
