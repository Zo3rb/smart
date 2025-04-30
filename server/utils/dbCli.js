#!/usr/bin/env node

const { sequelize } = require("./db");
const { initializeDatabase } = require("./dbInit");
const db = require("../models");

const showHelp = () => {
  console.log("Database CLI Tool");
  console.log("Usage: npm run db [command]");
  console.log("");
  console.log("Commands:");
  console.log("  init         Initialize the database schema");
  console.log("  reset        Reset database (drop all tables and recreate)");
  console.log("  seed         Run seeders to populate initial data");
  console.log("  status       Show database connection status");
};

const handleCommand = async () => {
  const command = process.argv[2];

  if (!command || command === "help") {
    showHelp();
    process.exit(0);
  }

  try {
    switch (command) {
      case "init":
        await initializeDatabase(false);
        break;

      case "reset":
        const confirmation = process.argv[3] === "--force";
        if (!confirmation) {
          console.error(
            "WARNING: This will delete all data. Use --force to confirm."
          );
          process.exit(1);
        }
        await initializeDatabase(true);
        console.log("Database reset successfully");
        break;

      case "seed":
        // This would be implemented using Sequelize seeders
        console.log("Seeding not implemented yet in this CLI tool");
        console.log(
          "Use sequelize-cli directly: npx sequelize-cli db:seed:all"
        );
        break;

      case "status":
        try {
          await sequelize.authenticate();
          console.log("Database connection OK");
        } catch (error) {
          console.error("Database connection FAILED", error.message);
          process.exit(1);
        }
        break;

      default:
        console.error(`Unknown command: ${command}`);
        showHelp();
        process.exit(1);
    }

    process.exit(0);
  } catch (error) {
    console.error(`Error executing command ${command}:`, error);
    process.exit(1);
  }
};

handleCommand();
