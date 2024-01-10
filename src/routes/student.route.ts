import { Router } from "express";
import {
  register,
  login,
  uploadStudent,
  deleteStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
} from "../controllers/student.controller";
import { isAuth } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import {
  loginSchema,
  registerSchema,
  updateSchema,
} from "../schemas/admin.schema";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/upload", uploadStudent);

router.post("/login", validate(loginSchema), login);

router.get("/", isAuth, getAllStudents);

router.get("/:id", getSingleStudent);

router.patch("/update", isAuth, validate(updateSchema), updateStudent);

router.delete("/delete", isAuth, deleteStudent);

export default router;
