import { UserDocument } from "@/models/user.model";
import { generateToken } from "@/utils";
import { NextFunction, Request, Response } from "express";

export const googleOAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user as UserDocument;
  const token = generateToken(user._id);

  res
    .cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/api/v1/auth",
    })
    .status(200)
    .json({
      message: "User logged in successfully",
      success: true,
      user,
      token,
    });
};
