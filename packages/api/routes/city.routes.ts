import { Router } from "express";

import { validateId } from "../middlewares/validation";
import { getCityById } from "../services/city.service";

export const cityRoutes = Router();

cityRoutes.get("/:id", validateId, async (req, res, next) => {
  const city = await getCityById(req.params.id);

  res.json({
    status: "success",
    data: city,
  });
});
