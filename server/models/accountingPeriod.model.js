const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class AccountingPeriod extends Model {
    static associate(models) {
      AccountingPeriod.belongsTo(models.FiscalYear, {
        foreignKey: "fiscal_year_id",
        as: "fiscalYear",
      });

      AccountingPeriod.hasMany(models.JournalEntry, {
        foreignKey: "period_id",
        as: "journalEntries",
      });
    }
  }

  AccountingPeriod.init(
    {
      period_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fiscal_year_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "fiscal_years",
          key: "fiscal_year_id",
        },
      },
      period_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      is_closed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "AccountingPeriod",
      tableName: "accounting_periods",
      timestamps: false,
    }
  );

  return AccountingPeriod;
};
