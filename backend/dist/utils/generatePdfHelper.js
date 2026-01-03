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
exports.getBrowser = exports.generatePdf = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const pdfQueue_1 = require("./pdfQueue");
const generatePdf = (html, options) => __awaiter(void 0, void 0, void 0, function* () {
    return pdfQueue_1.pdfQueue.add(() => __awaiter(void 0, void 0, void 0, function* () {
        const browser = yield (0, exports.getBrowser)();
        const page = yield browser.newPage();
        try {
            yield page.setContent(html, {
                waitUntil: "domcontentloaded",
            });
            const pdf = yield page.pdf({
                format: "A4",
                printBackground: true,
                margin: options.margin,
                scale: options.scale,
            });
            return Buffer.from(pdf);
        }
        finally {
            yield page.close();
        }
    }));
});
exports.generatePdf = generatePdf;
let browser = null;
const getBrowser = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!browser) {
        browser = yield puppeteer_1.default.launch({
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
});
exports.getBrowser = getBrowser;
