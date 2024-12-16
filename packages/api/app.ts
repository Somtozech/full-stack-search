import express from "express";
import cors from "cors";

import { config } from "./config";

export const createApp = () => {
  const app = express();

  app.use(cors(config.cors));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};
