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
import { isAuth, isHOD } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import {
  loginSchema,
  uploadSchema,
  registerSchema,
  updateSchema,
} from "../schemas/student.schema";

const router = Router();

router.post("/", validate(registerSchema), register);

router.post("/upload", isHOD, validate(uploadSchema), uploadStudent);

router.post("/login", validate(loginSchema), login);

router.get("/", isHOD, getAllStudents);

router.get("/:id", getSingleStudent);

router.patch("/", isAuth, validate(updateSchema), updateStudent);

router.delete("/:id", isHOD, deleteStudent);

export default router;
