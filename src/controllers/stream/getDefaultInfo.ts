import { DefaultStreamInfo } from "@/models/stream.model";
import { UserDocument } from "@/models/user.model";
import { CustomError } from "@/types";
import { NextFunction, Request, Response } from "express";

export const getDefaultInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.user as UserDocument;
    const defaultInfo = await DefaultStreamInfo.findOne({ user: _id });

    if (!defaultInfo) {
      const error = new Error() as CustomError;
      error.message = "Default info not found";
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Default Stream Information retrieved successfully",
      success: true,
      streamInfo: defaultInfo,
    });
  } catch (err) {
    next(err);
  }
};
