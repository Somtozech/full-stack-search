import { MongoMemoryServer } from "mongodb-memory-server";

const teardown = async (): Promise<void> => {
  const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;

  if (instance) {
    await instance.stop();
  }
};

export default teardown;
