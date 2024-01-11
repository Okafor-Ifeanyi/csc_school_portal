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
  uploadSchema,
  registerSchema,
  updateSchema,
} from "../schemas/student.schema";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/upload", validate(uploadSchema), uploadStudent);

router.post("/login", validate(loginSchema), login);

router.get("/", isAuth, getAllStudents);

router.get("/:id", getSingleStudent);

router.patch("/update", isAuth, validate(updateSchema), updateStudent);

router.delete("/delete", isAuth, deleteStudent);

export default router;
