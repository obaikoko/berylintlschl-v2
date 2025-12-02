import { Router } from "express";
import {
  createSubject,
  deleteSubject,
  getSubjects,
} from "../controllers/subjectController";
import { protect, admin } from "../middleware/authMiddleware";

const router = Router();

router
  .route("/")
  .get(protect, admin, getSubjects)
  .post(protect, admin, createSubject);
router.delete("/:id", protect, admin, deleteSubject);

export default router;
