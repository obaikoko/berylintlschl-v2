import PQueue from "p-queue";

export const pdfQueue = new PQueue({
  concurrency: 1, // 1 PDF at a time (safe for small VPS)
  intervalCap: 2, // max 2 jobs
  interval: 1000, // per 1 second
});
