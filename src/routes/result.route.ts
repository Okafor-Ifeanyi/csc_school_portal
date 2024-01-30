import { Router } from "express";
import {
  createResult,
  getAllResults,
  getSingleResult,
} from "../controllers/result.controller";
import { isAuth, isHOD } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import {
  registerSchema,
} from "../schemas/registered_course.schema";

const router = Router();

router.post("/register", isAuth, isHOD, validate(registerSchema), createResult);

router.post("/student", isAuth, isHOD, validate(registerSchema), createResult);

router.post("/", isAuth, isHOD, validate(registerSchema), createResult);

router.get("/", isAuth, isHOD, getAllResults);

router.get("/:id", getSingleResult);

// router.patch(
//   "/update/:id",
//   isAuth,
//   isHOD,
//   validate(updateSchema),
//   updateResult,
// );

// router.delete("/delete/:id", isAuth, isHOD, deleteResult);

export default router;
