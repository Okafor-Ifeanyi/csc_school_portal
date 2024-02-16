import { Router } from "express";
import {
  createClass,
  deleteClass,
  getAllClasses,
  getSingleClass,
  updateClass,
} from "../controllers/class.controller";
import { isAuth } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { registerSchema, updateSchema } from "../schemas/class.schema";

const router = Router();

router.post("/", isAuth, validate(registerSchema), createClass);

router.get("/", isAuth, getAllClasses);

router.get("/:id", getSingleClass);

router.patch("/:id", isAuth, validate(updateSchema), updateClass);

router.delete("/:id", isAuth, deleteClass);

export default router;
