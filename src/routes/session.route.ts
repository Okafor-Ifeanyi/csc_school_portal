import { Router } from "express";
import {
  createSession,
  deleteSession,
  getAllSessions,
  getSingleSession,
  updateSession,
} from "../controllers/session.controller";
import { isAuth, isHOD } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { registerSchema, updateSchema } from "../schemas/session.schema";

const router = Router();

router.post(
  "/register",
  isAuth,
  isHOD,
  validate(registerSchema),
  createSession,
);

router.get("/", isAuth, isHOD, getAllSessions);

router.get("/:id", getSingleSession);

router.patch(
  "/update/:id",
  isAuth,
  isHOD,
  validate(updateSchema),
  updateSession,
);

router.delete("/delete/:id", isAuth, isHOD, deleteSession);

export default router;
