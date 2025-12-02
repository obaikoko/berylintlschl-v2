"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectSchema = void 0;
const zod_1 = require("zod");
exports.subjectSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Subject name must be at least 2 characters"),
    code: zod_1.z.string().optional(),
    level: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
});
