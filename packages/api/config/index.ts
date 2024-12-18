import dotenv from "dotenv";

dotenv.config();

export const config = {
  app: {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3001,
    apiPrefix: process.env.API_PREFIX || "/api",
  },
  search: {
    defaultLimit: 15,
    maxLimit: 30, // Maximum allowed limit
  },
  database: {
    uri: process.env.DATABASE_URL || "mongodb://localhost:27017/fullstack-search",
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
