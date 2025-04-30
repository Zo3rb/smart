const winston = require("winston");
require("winston-daily-rotate-file");
const path = require("path");
const fs = require("fs");

// Ensure logs directory exists
const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf((info) => {
    let message = `${info.timestamp} [${info.level.toUpperCase()}]: ${
      info.message
    }`;

    // Add metadata if available
    if (info.metadata) {
      message += ` ${JSON.stringify(info.metadata)}`;
    }

    return message;
  })
);

// Create console transport
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(winston.format.colorize(), logFormat),
});

// Create file transports
const fileTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, "app-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
});

const errorFileTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, "error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "30d",
  level: "error",
});

// Create logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: logFormat,
  transports: [consoleTransport, fileTransport, errorFileTransport],
});

module.exports = logger;
