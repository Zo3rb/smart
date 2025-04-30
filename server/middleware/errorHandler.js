const logger = require("../utils/logger");

/**
 * Global error handler middleware for Express
 */
const errorHandler = (err, req, res, next) => {
  // Default to 500 server error
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log the error
  logger.error(`${err.message}`, {
    metadata: {
      statusCode: err.statusCode,
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
      user: req.user ? req.user.id : "anonymous",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
  });

  // Send different responses based on environment
  if (process.env.NODE_ENV === "development") {
    // In development, send detailed error
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    // In production, send limited error details
    if (err.isOperational) {
      // For operational errors, send message to client
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // For programming errors, send generic message
      return res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  }
};

module.exports = errorHandler;
