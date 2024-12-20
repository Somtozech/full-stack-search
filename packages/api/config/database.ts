import { MongoClient, Db, Collection, Document } from "mongodb";

import { logger } from "../utils/logger";
import { config } from "../config";
import { AvailableCollections } from "../enums";

let client: MongoClient | null = null;
let db: Db | null = null;

export const connect = async (): Promise<void> => {
  try {
    client = await MongoClient.connect(config.database.uri);
    db = client.db();

    logger.info(`Successfully connected to Database at ${config.database.uri}`);

    await syncSearchIndexes(db);
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

export const getCollection = <T extends Document>(key: AvailableCollections): Collection<T> => {
  const db = getInstance();
  return db.collection<T>(key);
};

const syncSearchIndexes = async (db: Db) => {
  try {
    await db
      .collection(AvailableCollections.Hotels)
      .createIndexes([{ key: { hotel_name: 1 } }, { key: { city: 1 } }, { key: { country: 1 } }]);

    await db.collection(AvailableCollections.Cities).createIndex({ name: 1 });

    await db.collection(AvailableCollections.Countries).createIndex({ country: 1 });

    logger.info("Database indexes created successfully");
  } catch (error) {
    logger.error("Error creating indexes:", error);
    throw error;
  }
};

export const reset = async () => {
  for (const collection of Object.values(AvailableCollections)) {
    await getCollection(collection).deleteMany({});
  }
};

export const close = async () => {
  if (client) {
    await client.close();
  }
};