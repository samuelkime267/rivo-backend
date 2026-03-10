import Stream from "@/models/stream.model";
import User from "@/models/user.model";
import { hashKey } from "@/utils";
import { NextFunction, Request, Response } from "express";

export const endStream = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;

    const hashed = hashKey(name);

    const user = await User.findOne({
      streamKeyHash: hashed,
    });

    if (!user) {
      return res.sendStatus(404);
    }

    await Stream.findOneAndUpdate(
      {
        user: user._id,
        isLive: true,
      },
      {
        isLive: false,
        endedAt: new Date(),
      },
    );

    // Trigger VOD worker here

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
