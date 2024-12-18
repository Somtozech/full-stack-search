import { Router } from "express";

import { getCountryById } from "../services/country.service";

export const countryRoutes = Router();

countryRoutes.get("/:id", async (req, res, next) => {
  const country = await getCountryById(req.params.id);

  res.json({
    status: "success",
    data: country,
  });
});
