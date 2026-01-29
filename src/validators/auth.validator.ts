import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "../schemas/auth";

export const registerValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = req;
    const parsedBody = registerSchema.parse(body);
    req.body = parsedBody;
    next();
  } catch (error) {
    next(error);
  }
};

export const loginValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = req;
    const parsedBody = loginSchema.parse(body);
    req.body = parsedBody;
    next();
  } catch (error) {
    next(error);
  }
};
