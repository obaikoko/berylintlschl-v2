"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfQueue = void 0;
const p_queue_1 = __importDefault(require("p-queue"));
exports.pdfQueue = new p_queue_1.default({
    concurrency: 1, // 1 PDF at a time (safe for small VPS)
    intervalCap: 2, // max 2 jobs
    interval: 1000, // per 1 second
});
