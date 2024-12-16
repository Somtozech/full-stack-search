import dotenv from "dotenv";

dotenv.config();

export const config = {
  app: {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3001,
  },
  logger: {
    level: process.env.LOG_LEVEL || "info",
    directory: process.env.LOG_DIRECTORY || "logs",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: process.env.CORS_CREDENTIALS !== "false",
  },
};
