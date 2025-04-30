// Load environment variables
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const logger = require("./utils/logger");
const app = require("./app");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...", {
    metadata: {
      message: err.message,
      stack: err.stack,
    },
  });
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...", {
    metadata: {
      message: err.message,
      stack: err.stack,
    },
  });
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully");
  server.close(() => {
    logger.info("Process terminated");
  });
});
