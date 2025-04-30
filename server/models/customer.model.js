const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "createdBy",
      });
    }
  }

  Customer.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      company_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      contact_person: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      mobile: {
        type: DataTypes.STRING(20),
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
      website: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      tax_id: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      credit_limit: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: {
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
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "customers",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Customer;
};
