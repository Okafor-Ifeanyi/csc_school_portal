import { Router } from "express";
import {
  register,
  deleteAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
} from "../controllers/admin.controller";
import { isAuth } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { registerSchema, updateSchema } from "../schemas/admin.schema";

const router = Router();

router.post("/", validate(registerSchema), register);

router.get("/", isAuth, getAllAdmins);

router.get("/:id", getSingleAdmin);

router.patch("/", isAuth, validate(updateSchema), updateAdmin);

router.delete("/", isAuth, deleteAdmin);

export default router;
