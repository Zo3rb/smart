const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class FiscalYear extends Model {
    static associate(models) {
      FiscalYear.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });

      FiscalYear.hasMany(models.JournalEntry, {
        foreignKey: "fiscal_year_id",
        as: "journalEntries",
      });
    }
  }

  FiscalYear.init(
    {
      fiscal_year_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "companies",
          key: "company_id",
        },
      },
      year_name: {
        type: DataTypes.STRING(20),
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
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "FiscalYear",
      tableName: "fiscal_years",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return FiscalYear;
};
