import { UserDocument } from "@/models/user.model";
import { generateToken } from "@/utils";
import { NextFunction, Request, Response } from "express";

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as UserDocument;
    const token = generateToken(user._id.toString(), true);

    res.status(200).json({
      message: "Generated Access Token Successfully",
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};
