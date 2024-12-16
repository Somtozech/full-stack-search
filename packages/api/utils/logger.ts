import winston, { format } from "winston";

import { config } from "../config";

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: config.logger.level,
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), colorize(), customFormat),
  transports: [
    new winston.transports.Console(),
    // File transport for errors
    new winston.transports.File({
      filename: `${config.logger.directory}/error.log`,
      level: "error",
    }),
    // File transport for all logs
    new winston.transports.File({
      filename: `${config.logger.directory}/combined.log`,
    }),
  ],
});
