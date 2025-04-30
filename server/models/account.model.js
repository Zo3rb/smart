const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.AccountCategory, {
        foreignKey: "category_id",
        as: "category",
      });

      Account.belongsTo(models.Account, {
        foreignKey: "parent_account_id",
        as: "parentAccount",
      });

      Account.hasMany(models.Account, {
        foreignKey: "parent_account_id",
        as: "childAccounts",
      });

      Account.hasMany(models.JournalEntryLine, {
        foreignKey: "account_id",
        as: "journalEntryLines",
      });
    }
  }

  Account.init(
    {
      account_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      account_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      account_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "account_categories",
          key: "category_id",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      parent_account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "accounts",
          key: "account_id",
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
      modelName: "Account",
      tableName: "accounts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Account;
};
