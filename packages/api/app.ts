import express, { Request, Response } from "express";
import cors from "cors";

import { config } from "./config";
import { apiRouter } from "./routes";
import { NotFoundError } from "./utils/errors";
import { errorHandler, notFoundHandler } from "middlewares/error";

export const createApp = () => {
  const app = express();

  app.use(cors(config.cors));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  });

  app.use("/api", apiRouter);

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
