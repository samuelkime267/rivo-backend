import { DefaultStreamInfo } from "@/models/stream.model";
import { UserDocument } from "@/models/user.model";
import { DefaultStreamInfoSchemaType } from "@/schemas/stream";
import { CustomError } from "@/types";
import { NextFunction, Request, Response } from "express";

export const updateDefaultInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.user as UserDocument;
    const defaultInfoBody = req.body as DefaultStreamInfoSchemaType;

    const defaultInfo = await DefaultStreamInfo.findOneAndUpdate(
      { user: _id },
      defaultInfoBody,
      { new: true },
    );

    if (!defaultInfo) {
      const error = new Error() as CustomError;
      error.message = "Default info not found";
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Default Stream Information retrieved successfully",
      success: true,
      data: defaultInfo,
    });
  } catch (err) {
    next(err);
  }
};
