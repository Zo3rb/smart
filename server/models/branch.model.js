const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Branch extends Model {
    static associate(models) {
      Branch.belongsTo(models.Company, {
        foreignKey: "company_id",
      });

      Branch.hasMany(models.JournalEntryLine, {
        foreignKey: "branch_id",
        as: "journalEntryLines",
      });
    }
  }

  Branch.init(
    {
      branch_id: {
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
      branch_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
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
      is_headquarters: {
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
      modelName: "Branch",
      tableName: "branches",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return Branch;
};
