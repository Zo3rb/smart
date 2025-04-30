const { Sequelize } = require("sequelize");
const config = require("../config/sequelize")[
  process.env.NODE_ENV || "development"
];
const logger = require("./logger");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: (msg) => logger.debug(msg),
    dialectOptions: config.dialectOptions,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established successfully");
    return true;
  } catch (error) {
    logger.error("Unable to connect to the database:", {
      metadata: {
        error: error.message,
        stack: error.stack,
      },
    });
    return false;
  }
};

module.exports = {
  sequelize,
  connectDB,
};
