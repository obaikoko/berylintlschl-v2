import puppeteer, { Browser } from "puppeteer";
import { pdfQueue } from "./pdfQueue";

export const generatePdf = async (
  html: string,
  options: {
    margin: {
      top: string;
      bottom: string;
      left: string;
      right: string;
    };
    scale: number;
  }
): Promise<Buffer> => {
  return pdfQueue.add(async () => {
    const browser = await getBrowser();
    const page = await browser.newPage();

    try {
      await page.setContent(html, {
        waitUntil: "domcontentloaded",
      });

      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: options.margin,
        scale: options.scale,
      });

      return Buffer.from(pdf);
    } finally {
      await page.close();
    }
  });
};


let browser: Browser | null = null;

export const getBrowser = async (): Promise<Browser> => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
  }

  return browser;
};
