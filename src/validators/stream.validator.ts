import { createStreamSchema, defaultStreamInfoSchema } from "@/schemas/stream";
import { NextFunction, Request, Response } from "express";

export const createStreamValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = req;
    const parsedBody = createStreamSchema.parse(body);
    req.body = parsedBody;
    next();
  } catch (error) {
    next(error);
  }
};
export const updateDefaultInfoValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = req;
    const parsedBody = defaultStreamInfoSchema.parse(body);
    req.body = parsedBody;
    next();
  } catch (error) {
    next(error);
  }
};
