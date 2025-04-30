const fs = require("fs");
const path = require("path");
const { sequelize } = require("../utils/db");

const db = {};

// Read all model files
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file !== "index.js" && file.indexOf(".") !== 0 && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

// Set up associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
