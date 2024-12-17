import { Router } from "express";

import { getCityById } from "../services/city.service";

export const cityRoutes = Router();

cityRoutes.get("/:id", async (req, res, next) => {
  const city = await getCityById(req.params.id);
  res.json(city);

  res.json({
    status: "success",
    data: city,
  });
});
