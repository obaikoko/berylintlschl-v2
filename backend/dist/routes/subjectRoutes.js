"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subjectController_1 = require("../controllers/subjectController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(authMiddleware_1.protect, authMiddleware_1.admin, subjectController_1.getSubjects)
    .post(authMiddleware_1.protect, authMiddleware_1.admin, subjectController_1.createSubject);
router.delete("/:id", authMiddleware_1.protect, authMiddleware_1.admin, subjectController_1.deleteSubject);
exports.default = router;
