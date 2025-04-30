const { sequelize } = require("./db");
const logger = require("./logger");

const initializeDatabase = async (force = false) => {
  try {
    logger.info(`Initializing database (force = ${force})`);

    // Sync all models with the database
    await sequelize.sync({ force });

    logger.info("Database initialized successfully");
    return true;
  } catch (error) {
    logger.error("Database initialization failed:", {
      metadata: {
        error: error.message,
        stack: error.stack,
      },
    });
    return false;
  }
};

module.exports = { initializeDatabase };
