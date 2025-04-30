// Load environment variables
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const logger = require("./utils/logger");
const app = require("./app");
const { connectDB } = require("./utils/db");

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

// Start server with database connection
const startServer = async () => {
  // Connect to database first
  const dbConnected = await connectDB();

  if (!dbConnected && process.env.NODE_ENV === "production") {
    logger.error("Database connection failed. Exiting application...");
    process.exit(1);
  }

  // Start server
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    logger.info(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
    if (!dbConnected) {
      logger.warn(
        "Server started without database connection. Some features may not work."
      );
    }
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
};

startServer();
