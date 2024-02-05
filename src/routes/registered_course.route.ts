import { Router } from "express";
import {
  createREGCourse,
  deleteREGCourse,
  getAllREGCourses,
  getSingleREGCourse,
  updateREGCourse,
} from "../controllers/registered_course.controller";
import { isAuth, isHOD } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import {
  registerSchema,
  updateSchema,
} from "../schemas/registered_course.schema";

const router = Router();

router.post("/", isAuth, isHOD, validate(registerSchema), createREGCourse);

router.get("/", isAuth, isHOD, getAllREGCourses);

router.get("/:id", getSingleREGCourse);

router.patch("/:id", isAuth, isHOD, validate(updateSchema), updateREGCourse);

router.delete("/:id", isAuth, isHOD, deleteREGCourse);

export default router;
