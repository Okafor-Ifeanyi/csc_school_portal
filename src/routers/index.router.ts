import { Request, Response, Router } from "express";
import admin from "./admin.router";
const router = Router();

router.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server ok" });
});

router.get("/docs", (req: Request, res: Response) => {
  res.redirect("https://documenter.getpostman.com/view/26151840/2s93JtQixJ");
});

router.use("/admins", admin);

export default router;
