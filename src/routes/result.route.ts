import { Router } from "express";
import {
  createResult,
  generateClassResult,
  getAllResults,
  getSingleResult,
} from "../controllers/result.controller";
import { isAuth, isHOD } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { generateClassSchema, registerSchema } from "../schemas/result.schema";

const router = Router();

router.post("/student", isAuth, isHOD, validate(registerSchema), createResult);

router.post(
  "/class",
  isAuth,
  isHOD,
  validate(generateClassSchema),
  generateClassResult,
);

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
