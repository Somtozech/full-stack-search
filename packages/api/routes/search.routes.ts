import express from "express";

import { validateSearchQuery } from "../middlewares/validation";
import * as searchService from "../services/search.service";

export const searchRoutes = express.Router();

searchRoutes.get("/", validateSearchQuery, async (req, res, next) => {
  const query = req.query.q as string;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

  const result = await searchService.search(query, { limit });
  res.json({
    status: "success",
    data: result,
  });
});
