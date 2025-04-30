const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class JournalEntryLine extends Model {
    static associate(models) {
      JournalEntryLine.belongsTo(models.JournalEntry, {
        foreignKey: "journal_entry_id",
        as: "journalEntry",
      });

      JournalEntryLine.belongsTo(models.Account, {
        foreignKey: "account_id",
        as: "account",
      });

      JournalEntryLine.belongsTo(models.Branch, {
        foreignKey: "branch_id",
        as: "branch",
      });

      JournalEntryLine.belongsTo(models.Department, {
        foreignKey: "department_id",
        as: "department",
      });
    }
  }

  JournalEntryLine.init(
    {
      line_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      journal_entry_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "journal_entries",
          key: "journal_entry_id",
        },
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "accounts",
          key: "account_id",
        },
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      debit: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: false,
        defaultValue: 0,
      },
      credit: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: false,
        defaultValue: 0,
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "branches",
          key: "branch_id",
        },
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "departments",
          key: "department_id",
        },
      },
    },
    {
      sequelize,
      modelName: "JournalEntryLine",
      tableName: "journal_entry_lines",
      timestamps: false,
    }
  );

  return JournalEntryLine;
};
