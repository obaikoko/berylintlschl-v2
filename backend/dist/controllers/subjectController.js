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
exports.deleteSubject = exports.getSubjects = exports.createSubject = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const subjectValidator_1 = require("../validators/subjectValidator");
const prisma_1 = require("../config/db/prisma");
const createSubject = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = subjectValidator_1.subjectSchema.parse(req.body);
    //   Check if subject already exist
    const subjectExist = yield prisma_1.prisma.subject.findFirst({
        where: {
            name: validateData.name,
        },
    });
    if (subjectExist) {
        res.status(400);
        throw new Error("Subject already exist");
    }
    yield prisma_1.prisma.subject.create({
        data: validateData,
    });
    res.status(201).json(`${validateData.name} added successfully to subjects`);
}));
exports.createSubject = createSubject;
const getSubjects = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjects = yield prisma_1.prisma.subject.findMany({
        orderBy: { name: "asc" },
    });
    res.json(subjects);
}));
exports.getSubjects = getSubjects;
const deleteSubject = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //   Check if subject exist
    const subjectExist = yield prisma_1.prisma.subject.findFirst({
        where: {
            id,
        },
    });
    if (!subjectExist) {
        res.status(404);
        throw new Error("Subject already exist");
    }
    yield prisma_1.prisma.subject.delete({
        where: { id },
    });
    res.json(`${subjectExist.name} removed from subjects`);
}));
exports.deleteSubject = deleteSubject;
