const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Journal extends Model {
    static associate(models) {
      Journal.hasMany(models.JournalEntry, {
        foreignKey: "journal_id",
        as: "journalEntries",
      });
    }
  }

  Journal.init(
    {
      journal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      journal_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      journal_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Journal",
      tableName: "journals",
      timestamps: false,
    }
  );

  return Journal;
};
