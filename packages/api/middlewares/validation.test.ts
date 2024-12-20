import { Request, Response, NextFunction } from "express";
import { validateSearchQuery } from "./validation";
import Joi from "joi";

describe("Validation", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      query: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    nextFunction = jest.fn();
  });

  describe("#q", () => {
    it("when query is invalid, should throw Validation Error", () => {
      expect(validateSearchQuery(mockRequest as Request, mockResponse as Response, nextFunction)).rejects.toThrow(
        Joi.ValidationError
      );

      expect(nextFunction).not.toHaveBeenCalled();
    });

    it("when query is valid, should call next function", async () => {
      mockRequest.query = { q: "valid search" };

      await validateSearchQuery(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });
  });

  describe("#limit", () => {
    it("when query includes valid limit, should call next function", async () => {
      mockRequest.query = {
        q: "valid search",
        limit: "10",
      };
      await validateSearchQuery(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
    });

    it("when limit is invalid, should throw validation Error", () => {
      mockRequest.query = {
        q: "valid search",
        limit: "51",
      };

      expect(validateSearchQuery(mockRequest as Request, mockResponse as Response, nextFunction)).rejects.toThrow(
        Joi.ValidationError
      );
      expect(nextFunction).not.toHaveBeenCalled();
    });
  });
});
