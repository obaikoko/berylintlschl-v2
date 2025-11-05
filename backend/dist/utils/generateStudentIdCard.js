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
exports.generateStudentIdCard = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const qrcode_1 = __importDefault(require("qrcode"));
const generateStudentIdCard = (res, student) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = new pdfkit_1.default({ size: "A4", margin: 0 });
    const currentYear = new Date().getFullYear();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${student.firstName}-ID-Card.pdf"`);
    doc.pipe(res);
    const A4_WIDTH = 595;
    const cardWidth = 260;
    const cardHeight = 170;
    const centerX = (A4_WIDTH - cardWidth) / 2;
    const gap = 20;
    // Colors
    const blue = "#0047AB";
    const red = "#C0392B";
    const lightGray = "#f9fafb";
    // ================= FRONT SIDE =================
    const frontY = 80;
    doc.rect(centerX, frontY, cardWidth, cardHeight).fill(lightGray);
    // Header
    doc.fillColor("white").rect(centerX, frontY, cardWidth, 50).fill("white");
    // Logo
    if (process.env.SCHOOL_LOGO) {
        try {
            const response = yield fetch(process.env.SCHOOL_LOGO);
            const arrayBuffer = yield response.arrayBuffer();
            const logoBuffer = Buffer.from(arrayBuffer);
            doc.image(logoBuffer, centerX + 10, frontY + 8, {
                width: 35,
                height: 35,
            });
        }
        catch (err) {
            console.warn("Logo load failed:", err);
        }
    }
    // School name & address
    doc
        .fillColor(blue)
        .font("Helvetica-Bold")
        .fontSize(12)
        .text("BERYL", centerX + 50, frontY + 8)
        .font("Helvetica")
        .fontSize(10)
        .text("INTERNATIONAL SCHOOLS, CALABAR", centerX + 50, frontY + 20)
        .font("Helvetica")
        .fontSize(7)
        .fillColor("black")
        .text("Calabar Post 1, Block 1 Unit Enebong (Federal Housing Estate)", centerX + 50, frontY + 33)
        .text("Calabar Municipality, Cross River State.", centerX + 50, frontY + 41);
    // Red bar
    doc
        .fillColor(red)
        .rect(centerX, frontY + 50, cardWidth, 15)
        .fill();
    doc
        .fillColor("white")
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("IDENTITY CARD", centerX, frontY + 53, {
        align: "center",
        width: cardWidth,
    });
    // Photo
    if (student.imageUrl) {
        try {
            const response = yield fetch(student.imageUrl);
            const arrayBuffer = yield response.arrayBuffer();
            const imgBuffer = Buffer.from(arrayBuffer);
            doc.image(imgBuffer, centerX + 10, frontY + 70, {
                width: 50,
                height: 60,
            });
        }
        catch (err) {
            console.warn("Could not load student photo:", err);
        }
    }
    else {
        doc.rect(centerX + 10, frontY + 70, 50, 60).stroke("#cccccc");
    }
    // Student details
    const textX = centerX + 70;
    let y = frontY + 75;
    doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor("black")
        .text(`NAME:`, textX, y)
        .font("Helvetica")
        .text(`${student.firstName} ${student.lastName}`, textX + 35, y);
    y += 18;
    doc
        .font("Helvetica-Bold")
        .text(`LEVEL:`, textX, y)
        .font("Helvetica")
        .text(`${student.level}`, textX + 35, y);
    y += 18;
    doc
        .font("Helvetica-Bold")
        .text(`PARENT'S NO:`, textX, y)
        .font("Helvetica")
        .text(`${student.sponsorPhoneNumber || "N/A"}`, textX + 65, y);
    // Footer
    doc
        .fillColor(blue)
        .rect(centerX, frontY + 150, cardWidth, 20)
        .fill();
    doc
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor("white")
        .text("GOD IS THE GIVER OF WISDOM", centerX, frontY + 156, {
        align: "center",
        width: cardWidth,
    });
    // ================= BACK SIDE =================
    const backY = frontY + cardHeight + gap;
    doc.rect(centerX, backY, cardWidth, cardHeight).fill(lightGray);
    // Blue header
    doc.fillColor(blue).rect(centerX, backY, cardWidth, 25).fill();
    doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor("white")
        .text("STUDENT IDENTITY CARD", centerX, backY + 7, {
        align: "center",
        width: cardWidth,
    });
    // QR code
    const qrDataUrl = yield qrcode_1.default.toDataURL(`${process.env.PUBLIC_DOMAIN}/admin/students/${student.id}`);
    const qrImage = qrDataUrl.replace(/^data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(qrImage, "base64");
    doc.image(qrBuffer, centerX + 15, backY + 40, { width: 60, height: 60 });
    // Student info (right side)
    let backX = centerX + 90;
    let backYText = backY + 45;
    doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor("black")
        .text("STUDENT ID:", backX, backYText)
        .font("Helvetica")
        .text(student.studentId || "N/A", backX + 70, backYText);
    backYText += 15;
    doc
        .font("Helvetica-Bold")
        .text("CLASS:", backX, backYText)
        .font("Helvetica")
        .text(student.level || "N/A", backX + 70, backYText);
    backYText += 15;
    doc
        .font("Helvetica-Bold")
        .text("DATE:", backX, backYText)
        .font("Helvetica")
        .text(`${currentYear}`, backX + 70, backYText);
    // Signature lines
    doc
        .moveTo(centerX + 20, backY + 120)
        .lineTo(centerX + 100, backY + 120)
        .stroke("#000")
        .moveTo(centerX + 160, backY + 120)
        .lineTo(centerX + 240, backY + 120)
        .stroke("#000");
    doc
        .fontSize(8)
        .fillColor("black")
        .text("Student's Signature", centerX + 25, backY + 123)
        .text("Principal's Signature", centerX + 165, backY + 123);
    // Disclaimer
    doc
        .fillColor(blue)
        .fontSize(7)
        .text("If found, please return to the school address on the front.", centerX, backY + 145, {
        align: "center",
        width: cardWidth,
    });
    doc.end();
});
exports.generateStudentIdCard = generateStudentIdCard;
