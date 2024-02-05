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
import { registerSchema, updateSchema } from "../schemas/course.schema";

const router = Router();

router.post("/", isAuth, isHOD, validate(registerSchema), createCourse);

router.get("/", isAuth, isHOD, getAllCourses);

router.get("/:id", getSingleCourse);

router.patch("/:id", isAuth, isHOD, validate(updateSchema), updateCourse);

router.delete("/:id", isAuth, isHOD, deleteCourse);

export default router;
