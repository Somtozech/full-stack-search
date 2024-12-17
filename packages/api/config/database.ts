import { MongoClient, Db, Collection } from "mongodb";

import { logger } from "../utils/logger";
import { config } from "../config";
import { AvailableCollections } from "enums";

let client: MongoClient | null = null;
let db: Db | null = null;

export const connect = async (): Promise<void> => {
  try {
    client = await MongoClient.connect(config.database.uri);
    db = client.db();

    logger.info(`Successfully connected to Database at ${config.database.uri}`);

    await createSearchIndexes(db);
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

export const getCollection = (key: AvailableCollections): Collection => {
  const db = getInstance();
  return db.collection(key);
};

const createSearchIndexes = async (db: Db) => {
  try {
    await db
      .collection("hotels")
      .createIndexes([{ key: { hotel_name: 1 } }, { key: { city: 1 } }, { key: { country: 1 } }]);

    await db.collection("cities").createIndex({ name: 1 });

    await db.collection("countries").createIndex({ country: 1 });

    logger.info("Database indexes created successfully");
  } catch (error) {
    logger.error("Error creating indexes:", error);
    throw error;
  }
};
