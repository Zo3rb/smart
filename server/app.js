const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const morgan = require("morgan");
const compression = require("compression");

const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/AppError");
const rateLimiter = require("./middleware/rateLimiter");

// Initialize Express app
const app = express();

// Basic middleware
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use("/api", rateLimiter);

// Logger middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Log requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`, {
    metadata: {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    },
  });
  next();
});

// Routes
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "success", message: "API is running" });
});

// Define API routes here
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/auth', authRouter);

// IMPORTANT: Fixed 404 handler for API routes - avoid using * wildcards
app.use("/api", (req, res, next) => {
  // Only match if path starts with /api but not /api/health
  if (req.originalUrl.startsWith("/api") && req.originalUrl !== "/api/health") {
    return next(new AppError(`Route ${req.originalUrl} not found`, 404));
  }
  next();
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // IMPORTANT: Modified to avoid wildcards
  app.use((req, res, next) => {
    if (!req.originalUrl.startsWith("/api")) {
      return res.sendFile(
        path.resolve(__dirname, "../client/build", "index.html")
      );
    }
    next();
  });
} else {
  // IMPORTANT: In development, 404 handler without wildcards
  app.use((req, res, next) => {
    if (!req.originalUrl.startsWith("/api")) {
      return res.status(404).send(`Route ${req.originalUrl} not found`);
    }
    next();
  });
}

// Global error handling middleware
app.use(errorHandler);

module.exports = app;
