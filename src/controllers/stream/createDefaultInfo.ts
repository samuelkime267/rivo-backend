import { DefaultStreamInfo } from "@/models/stream.model";
import { UserDocument } from "@/models/user.model";
import { DefaultStreamInfoSchemaType } from "@/schemas/stream";
import { CustomError } from "@/types";
import { NextFunction, Request, Response } from "express";

export const createDefaultInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.user as UserDocument;
    const defaultInfoBody = req.body as DefaultStreamInfoSchemaType;

    const existingDefaultInfo = await DefaultStreamInfo.findOne({ user: _id });

    if (existingDefaultInfo) {
      const error = new Error() as CustomError;
      error.message = "Default info already exist";
      error.statusCode = 400;
      throw error;
    }

    const defaultInfo = await DefaultStreamInfo.create({
      user: _id,
      ...defaultInfoBody,
    });

    res.status(200).json({
      message: "Default Stream Information created successfully",
      success: true,
      streamInfo: defaultInfo,
    });
  } catch (err) {
    next(err);
  }
};
