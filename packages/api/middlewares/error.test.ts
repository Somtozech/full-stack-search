import { MongoError } from "mongodb";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

import { notFoundHandler, errorHandler } from "./error";
import { BadRequestError } from "../utils/errors";
import { logger } from "../utils/logger";

describe("notFoundHandler", () => {
  it("when a route is not found, should call next with NotFoundError", () => {
    const mockRequest = { path: "/non-existent-route" } as Request;
    const mockNext = jest.fn() as NextFunction;

    notFoundHandler(mockRequest, {} as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "NotFoundError",
        message: expect.stringContaining("/non-existent-route"),
      })
    );
  });
});

describe("errorHandler", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("when a BaseError is passed, should send error response with correct status and message", () => {
    const baseError = new BadRequestError("Test bad request");

    errorHandler(baseError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(logger.error).toHaveBeenCalledWith(baseError);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Test bad request",
    });
  });

  it("when a Joi validation error is passed, should send BadRequestError", () => {
    const validationError = new Joi.ValidationError("details", [{ message: "Validation failed" }] as any, undefined);

    errorHandler(validationError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(logger.error).toHaveBeenCalledWith(validationError);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Validation failed",
    });
  });

  it("when a MongoError with duplicate key is passed, should send ConflictError", () => {
    const mongoError = new MongoError("Duplicate key error");
    (mongoError as any).code = 11000;

    errorHandler(mongoError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(logger.error).toHaveBeenCalledWith(mongoError);
    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: expect.any(String),
    });
  });

  it("when an unknown error is passed, should send InternalServerError", () => {
    const unknownError = new Error("Unknown error");

    errorHandler(unknownError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(logger.error).toHaveBeenCalledWith(unknownError);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: expect.any(String),
    });
  });
});
