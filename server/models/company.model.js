const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Branch, {
        foreignKey: "company_id",
        as: "branches",
      });

      Company.hasMany(models.FiscalYear, {
        foreignKey: "company_id",
        as: "fiscalYears",
      });
    }
  }

  Company.init(
    {
      company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      legal_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      tax_id: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      address_line1: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      address_line2: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      logo_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "companies",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return Company;
};
