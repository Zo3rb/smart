const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class JournalEntry extends Model {
    static associate(models) {
      JournalEntry.belongsTo(models.FiscalYear, {
        foreignKey: "fiscal_year_id",
        as: "fiscalYear",
      });

      JournalEntry.belongsTo(models.Currency, {
        foreignKey: "currency_id",
        as: "currency",
      });

      JournalEntry.belongsTo(models.User, {
        foreignKey: "created_by_user_id",
        as: "createdBy",
      });

      JournalEntry.hasMany(models.JournalEntryLine, {
        foreignKey: "journal_entry_id",
        as: "lines",
      });
    }
  }

  JournalEntry.init(
    {
      journal_entry_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      entry_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      fiscal_year_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "fiscal_years",
          key: "fiscal_year_id",
        },
      },
      currency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "currencies",
          key: "currency_id",
        },
      },
      reference_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_by_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      is_posted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      posted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "JournalEntry",
      tableName: "journal_entries",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return JournalEntry;
};
