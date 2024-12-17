import express from "express";

import { searchRoutes } from "./search.routes";
import { hotelRoutes } from "./hotel.routes";

export const apiRouter = express.Router();

apiRouter.use("/search", searchRoutes);
apiRouter.use("/hotels", hotelRoutes);
