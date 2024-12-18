import { Request, Response, NextFunction } from "express";
import { MongoError } from "mongodb";
import Joi from "joi";

import { logger } from "../utils/logger";
import { BadRequestError, BaseError, ConflictError, InternalServerError, NotFoundError } from "../utils/errors";

// 404 Not Found Handler (default handler for undefined routes)
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`The API endpoint does not exist ${req.path}.`));
};

// Global Error Handler
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  const httpError: BaseError = _extractHttpErrorFromError(err as Error);

  res.status(httpError.status).json({
    status: "error",
    message: httpError.message,
  });
};

const _extractHttpErrorFromError = (error: Error): BaseError => {
  if (error instanceof BaseError) return error;

  if (error instanceof Joi.ValidationError) {
    return new BadRequestError(`${error.details[0].message}`);
  }

  if (error instanceof MongoError) {
    if (error.code === 11000) {
      return new ConflictError();
    }
  }

  return new InternalServerError();
};
