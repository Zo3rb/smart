const dotenv = require("dotenv");

// Load environment variables based on NODE_ENV
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: console.log,
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
  },
};
