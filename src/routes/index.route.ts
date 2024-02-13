import { Request, Response, Router } from "express";
import admin from "./admin.route";
import data from "./class.route";
import student from "./student.route";
import user from "./user.route";
import session from "./session.route";
import course from "./course.route";
import result from "./result.route";
import registered_course from "./registered_course.route";
import { login, logout } from "../controllers/auth.controller";
import validate from "../middlewares/validate.middleware";
import { loginSchema } from "../schemas/auth.schema";
const router = Router();

router.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server ok" });
});

router.get("/docs", (req: Request, res: Response) => {
  res.redirect("https://documenter.getpostman.com/view/19026826/2s9YsNdAcH");
});

router.post("/auth/login", validate(loginSchema), login);
router.get("/auth/logout", logout);
router.use("/admins", admin);
router.use("/classes", data);
router.use("/sessions", session);
router.use("/courses", course);
router.use("/registered_courses", registered_course);
router.use("/results", result);
router.use("/students", student);
router.use("/users", user);

export default router;
