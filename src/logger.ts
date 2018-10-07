import * as winston from "winston";

export const banLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({level: "debug", filename: "./bans.log"}),
  ],
});

export const messagesLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({level: "debug", filename: "./messages.log"}),
  ],
});

export const errorLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({level: "debug", filename: "./error.log"}),
  ],
});
