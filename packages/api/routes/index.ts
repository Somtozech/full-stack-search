import express from "express";

import { searchRoutes } from "./search.routes";

export const apiRouter = express.Router();

apiRouter.use("/search", searchRoutes);
