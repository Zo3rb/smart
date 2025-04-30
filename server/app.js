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
const setupSwagger = require("./docs");

// Importing routes
const { healthRoutes } = require("./routes");

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

// Setup Swagger documentation (only in development)
if (process.env.NODE_ENV !== "production") {
  setupSwagger(app); // Add this line
}

// Routes
app.use("/api/health", healthRoutes);

app.use("/api", (req, res, next) => {
  if (req.originalUrl.startsWith("/api") && req.originalUrl !== "/api/health") {
    return next(new AppError(`Route ${req.originalUrl} not found`, 404));
  }
  next();
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.use((req, res, next) => {
    if (!req.originalUrl.startsWith("/api")) {
      return res.sendFile(
        path.resolve(__dirname, "../client/build", "index.html")
      );
    }
    next();
  });
} else {
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
