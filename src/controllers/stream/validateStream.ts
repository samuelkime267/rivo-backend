import { encrypt } from "@/lib/encryption";
import Stream, { DefaultStreamInfo } from "@/models/stream.model";
import User from "@/models/user.model";
import { CustomError } from "@/types";
import { NextFunction, Request, Response } from "express";

export const validateStream = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;

    const encryptedKey = encrypt(name);

    const user = await User.findOne({
      streamKey: encryptedKey,
    });

    if (!user) {
      const error = new Error() as CustomError;
      error.message = "Invalid stream key";
      error.statusCode = 403;
      throw error;
    }

    //Checks if user is already live
    const liveStream = await Stream.findOne({
      user: user._id,
      isLive: true,
    });

    if (liveStream) return res.status(200).send("OK");

    //Checks if there's a scheduled stream in that time period
    const scheduledStream = await Stream.findOneAndUpdate(
      {
        user: user._id,
        isLive: false,
        scheduledFor: {
          $lte: new Date(),
          $gte: new Date(Date.now() - 60 * 60 * 1000),
        },
      },
      {
        isLive: true,
        startedAt: new Date(),
      },
    );

    if (scheduledStream) return res.status(200).send("OK");

    // If there's no scheduled stream, create a new one with default values
    const defaultStreamInfo = await DefaultStreamInfo.findOne({
      user: user._id,
    });

    if (!defaultStreamInfo) {
      const error = new Error() as CustomError;
      error.message = "Invalid stream key";
      error.statusCode = 403;
      throw error;
    }

    await Stream.create({
      description: defaultStreamInfo.description,
      name: defaultStreamInfo.name,
      user: user._id,
      isLive: true,
      startedAt: new Date(),
      category: defaultStreamInfo.category,
      tags: defaultStreamInfo.tags,
      viewers: 0,
      streamUrl: `http://localhost:8080/hls/${name}.m3u8`,
    });

    return res.status(200).send("OK");
  } catch (error) {
    console.log(error);
    res.status(403).send("Something went wrong");
  }
};
