import { MongoMemoryServer } from "mongodb-memory-server";

const setup = async (): Promise<void> => {
  if (process.env.TEST_DB_URI) {
    process.env.DATABASE_URL = process.env.TEST_DB_URI;
    return;
  }

  const mongoServer = await MongoMemoryServer.create({
    instance: {
      port: 3003,
    },
  });

  (global as any).__MONGOINSTANCE = mongoServer;

  process.env.DATABASE_URL = mongoServer.getUri();
};

export default setup;
