import { Router } from "express";
import { getAllUsers, getSingleUser } from "../controllers/user.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", isAuth, getAllUsers);

router.get("/:id", getSingleUser);

export default router;
