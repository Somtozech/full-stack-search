import { ErrorResponse } from "../types";

export const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object") {
    if ("message" in error) {
      return error.message as string;
    }

    if ("data" in error) {
      const { data } = error as { data: ErrorResponse };
      if (data && data.message) {
        return data.message;
      }
    }
  }

  return "An unexpected error occurred";
};
