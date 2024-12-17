import express from "express";

import { validateSearchQuery } from "../middlewares/validation";
import * as searchService from "../services/search.service";

export const searchRoutes = express.Router();

searchRoutes.get("/", validateSearchQuery, async (req, res, next) => {
  const result = await searchService.search(req.query.q as string);
  res.json({
    status: "success",
    data: result,
  });
});
