import { Router } from "express";
import {
  register,
  login,
  logout,
  refreshToken,
  googleOAuthCallback,
  googleOAuthLogin,
} from "@/controllers/auth";
import { loginValidator, registerValidator } from "@/validators/auth.validator";
import { isValidRefreshToken, isAuthenticated } from "@/middleware";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register", registerValidator, register);
authRouter.post("/login", loginValidator, login);
authRouter.post("/logout", isAuthenticated, isValidRefreshToken, logout);
authRouter.post("/refresh-token", isValidRefreshToken, refreshToken);
authRouter.get("/google", googleOAuthLogin);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleOAuthCallback,
);

export default authRouter;
