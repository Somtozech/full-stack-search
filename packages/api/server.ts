import { logger } from "./utils/logger";
import { createApp } from "./app";
import { config } from "./config";
import * as db from "./config/database";

const startServer = async () => {
  try {
    await db.connect();

    const app = createApp();

    app.listen(config.app.port, () => {
      logger.info(`Server listening on port: ${config.app.port} ✅`);
    });
  } catch (error) {
    logger.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
