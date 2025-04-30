const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class AccountCategory extends Model {
    static associate(models) {
      AccountCategory.hasMany(models.Account, {
        foreignKey: "category_id",
        as: "accounts",
      });
    }
  }

  AccountCategory.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      category_type: {
        type: DataTypes.ENUM,
        values: ["asset", "liability", "equity", "revenue", "expense"],
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "AccountCategory",
      tableName: "account_categories",
      timestamps: false,
    }
  );

  return AccountCategory;
};
