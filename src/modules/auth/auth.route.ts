import { Router } from "express";
import { loginUser } from "./auth.controller";

const router = Router();
router.post("/login", loginUser.authController);
export const authRouter = router;
