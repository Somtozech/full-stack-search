import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

import { logger } from "../utils/logger";

let client: MongoClient | null = null;
let db: Db | null = null;
let mongoServer: MongoMemoryServer | null = null;

export const connect = async (): Promise<void> => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    client = await MongoClient.connect(mongoUri);
    db = client.db();

    logger.info(`Successfully connected to Database at ${mongoUri}`);
  } catch (error) {
    logger.error("Database connection error:", error);
    process.exit(1);
  }
};

export const getInstance = (): Db => {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
};
