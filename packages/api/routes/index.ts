import express from "express";

import { searchRoutes } from "./search.routes";
import { hotelRoutes } from "./hotel.routes";
import { cityRoutes } from "./city.routes";
import { countryRoutes } from "./country.routes";

export const apiRouter = express.Router();

apiRouter.use("/search", searchRoutes);
apiRouter.use("/hotels", hotelRoutes);
apiRouter.use("/cities", cityRoutes);
apiRouter.use("/countries", countryRoutes);
