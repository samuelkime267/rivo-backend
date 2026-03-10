import { getMe, getStreamKey } from "@/controllers/user";
import { isAuthenticated } from "@/middleware";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/me", isAuthenticated, getMe);
userRouter.get("/stream-key", isAuthenticated, getStreamKey);

export default userRouter;
