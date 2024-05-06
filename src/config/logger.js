import winston, { format, transports, createLogger } from "winston";

const logger = createLogger({
  transports: [
    new transports.File({
      level: "info",
      filename: "logs/logData.log",
      format: format.combine(format.timestamp(), format.json(), format.metadata(), format.errors({ stack: true })),
    }),
  ],
});

export default logger;
