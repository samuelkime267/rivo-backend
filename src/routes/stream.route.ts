import {
  createStream,
  endStream,
  validateStream,
  getDefaultInfo,
  updateDefaultInfo,
  createDefaultInfo,
} from "@/controllers/stream";
import { isAuthenticated } from "@/middleware";
import {
  createStreamValidator,
  updateDefaultInfoValidator,
} from "@/validators/stream.validator";
import { Router, urlencoded } from "express";

const streamRouter = Router();

streamRouter.post(
  "/create",
  createStreamValidator,
  isAuthenticated,
  createStream,
);
streamRouter.post("/end", urlencoded({ extended: true }), endStream);
streamRouter.post("/validate", urlencoded({ extended: true }), validateStream);
streamRouter.get("/default-info", isAuthenticated, getDefaultInfo);
streamRouter.put(
  "/default-info",
  updateDefaultInfoValidator,
  isAuthenticated,
  updateDefaultInfo,
);
streamRouter.post(
  "/default-info",
  updateDefaultInfoValidator,
  isAuthenticated,
  createDefaultInfo,
);

export default streamRouter;
