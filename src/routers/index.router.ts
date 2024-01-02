import { Request, Response, Router } from "express";

const router = Router();

router.get("/healthcheck", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Server ok" });
});

router.get("/docs", (_req: Request, res: Response) => {
  res.redirect("https://documenter.getpostman.com/view/26151840/2s93JtQixJ");
});

export default router;
