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

router.post("/register", validate(registerSchema), register);

router.get("/", isAuth, getAllAdmins);

router.get("/:id", getSingleAdmin);

router.patch("/update", isAuth, validate(updateSchema), updateAdmin);

router.delete("/delete", isAuth, deleteAdmin);

export default router;
