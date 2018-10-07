import * as path from "path";
import * as winston from "winston";

const maxsize = 2000 * 1000 * 10;
const level = "debug";

export const banLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({maxsize, level, filename: path.join(__dirname, "/logs/bans.log")}),
  ],
});

export const messagesLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({maxsize, level, filename: path.join(__dirname, "/logs/messages.log")}),
  ],
});

export const errorLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({maxsize, level, filename: path.join(__dirname, "/logs/error.log")}),
  ],
});
