import { Router } from "express";

import { validateId } from "../middlewares/validation";
import { getHotelById } from "../services/hotel.service";

export const hotelRoutes = Router();

hotelRoutes.get("/:id", validateId, async (req, res, next) => {
  const hotel = await getHotelById(req.params.id);

  res.json({
    status: "success",
    data: hotel,
  });
});
