import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { BadRequestError, BaseError, ConflictError, InternalServerError, NotFoundError } from "../utils/errors";
import { MongoError } from "mongodb";
import { ZodError } from "zod";

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
    error: httpError.message,
    timestamp: new Date().toISOString(),
  });
};

const _extractHttpErrorFromError = (error: Error): BaseError => {
  if (error instanceof BaseError) return error;

  if (error instanceof ZodError) {
    const firstError = error.errors[0];
    return new BadRequestError(`${firstError.path.join(".")}: ${firstError.message}`);
  }

  if (error instanceof MongoError) {
    if (error.code === 11000) {
      return new ConflictError();
    }
  }

  return new InternalServerError();
};
