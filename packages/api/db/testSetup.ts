import * as db from "../config/database";

export const setupDatabaseConnection = () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.reset();
  });
};
