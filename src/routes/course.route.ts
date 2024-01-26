import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
} from "../controllers/course.controller";
import { isAuth, isHOD } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { registerSchema } from "../schemas/course.schema";

const router = Router();

router.post("/register", isAuth, isHOD, validate(registerSchema), createCourse);

router.get("/", isAuth, isHOD, getAllCourses);

router.get("/:id", getSingleCourse);

router.patch(
  "/update/:id",
  isAuth,
  isHOD,
  validate(registerSchema),
  updateCourse,
);

router.delete("/delete/:id", isAuth, isHOD, deleteCourse);

export default router;
