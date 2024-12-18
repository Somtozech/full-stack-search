// src/middleware/validation.ts
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import Joi from "joi";

import { BadRequestError } from "../utils/errors";
import { config } from "../config";

const searchQuerySchema = Joi.object({
  q: Joi.string().required(),
  limit: Joi.number().integer().min(5).max(config.search.maxLimit),
});

export const validateSearchQuery = async (req: Request, res: Response, next: NextFunction) => {
  const query = await searchQuerySchema.validateAsync(req.query, { convert: true });
  req.query = query;
  next();
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  if (!ObjectId.isValid(req.params.id)) {
    throw new BadRequestError("Invalid ID");
  }

  next();
};
