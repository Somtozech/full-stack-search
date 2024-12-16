import { HttpStatusCodes } from "enums";

export class BaseError extends Error {
  constructor(public status: HttpStatusCodes, message: string, public data?: any) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string = "Resource not found", data?: any) {
    super(HttpStatusCodes.NotFound, message, data);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string = "Bad request", data?: any) {
    super(HttpStatusCodes.BadRequest, message, data);
  }
}

export class ConflictError extends BaseError {
  constructor(message: string = "Resource already exists", data?: any) {
    super(HttpStatusCodes.Conflict, message, data);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string = "Internal server error", data?: any) {
    super(HttpStatusCodes.InternalServerError, message, data);
  }
}
