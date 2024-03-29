import { Router } from "express";
import {
  createClass,
  deleteClass,
  getAllClasses,
  getSingleClass,
  updateClass,
} from "../controllers/class.controller";
import { isAuth, isHOD } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { registerSchema, updateSchema } from "../schemas/class.schema";

const router = Router();

router.post("/", isAuth, isHOD, validate(registerSchema), createClass);

router.get("/", isAuth, isHOD, getAllClasses);

router.get("/:id", getSingleClass);

router.patch("/:id", isAuth, isHOD, validate(updateSchema), updateClass);

router.delete("/:id", isAuth, isHOD, deleteClass);

export default router;
