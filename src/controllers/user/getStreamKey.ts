import { decrypt } from "@/lib/encryption";
import { UserDocument } from "@/models/user.model";
import { NextFunction, Request, Response } from "express";

export const getStreamKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { streamKey } = req.user as UserDocument;
  const decryptedStreamKey = decrypt(streamKey);

  res.status(200).json({
    message: "User retrieved successfully",
    success: true,
    user: {
      streamKey: decryptedStreamKey,
    },
  });
};
