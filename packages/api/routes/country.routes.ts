import { Router } from "express";

import { validateId } from "../middlewares/validation";
import { getCountryById } from "../services/country.service";

export const countryRoutes = Router();

countryRoutes.get("/:id", validateId, async (req, res, next) => {
  const country = await getCountryById(req.params.id);

  res.json({
    status: "success",
    data: country,
  });
});
