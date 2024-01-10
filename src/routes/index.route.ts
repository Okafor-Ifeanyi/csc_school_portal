import { Request, Response, Router } from "express";
import admin from "./admin.route";
import data from "./class.route";
import student from "./student.route";
const router = Router();

router.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server ok" });
});

router.get("/docs", (req: Request, res: Response) => {
  res.redirect("https://documenter.getpostman.com/view/26151840/2s93JtQixJ");
});

router.use("/admins", admin);
router.use("/classes", data);
router.use("/students", student);

export default router;
