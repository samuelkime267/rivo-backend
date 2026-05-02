import Stream from "@/models/stream.model";
import { UserDocument } from "@/models/user.model";
import { CreateStreamSchemaType } from "@/schemas/stream";
import { NextFunction, Request, Response } from "express";

export const createStream = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { description, name, scheduledFor, category, isLive, tags } =
      req.body as CreateStreamSchemaType;
    const user = req.user as UserDocument;

    const stream = await Stream.create({
      description,
      name,
      user: user._id,
      scheduledFor,
      tags,
      category,
      isLive,
    });

    res.status(201).json({
      message: "Stream created successfully",
      success: true,
      data: stream,
    });
  } catch (error) {
    next(error);
  }
};
