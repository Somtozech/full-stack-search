// src/middleware/validation.ts
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { BadRequestError } from "../utils/errors";
import { ObjectId } from "mongodb";

const searchQuerySchema = z.object({
  q: z.string().min(1).max(100),
});

export const validateSearchQuery = (req: Request, res: Response, next: NextFunction) => {
  const query = searchQuerySchema.parse({ q: req.query.q });
  req.query = query;
  next();
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  if (!ObjectId.isValid(req.params.id)) {
    throw new BadRequestError("Invalid ID");
  }

  next();
};
