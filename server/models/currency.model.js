const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Currency extends Model {
    static associate(models) {
      Currency.hasMany(models.ExchangeRate, {
        foreignKey: "currency_id",
        as: "exchangeRates",
      });

      Currency.hasMany(models.JournalEntry, {
        foreignKey: "currency_id",
        as: "journalEntries",
      });
    }
  }

  Currency.init(
    {
      currency_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING(3),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      symbol: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      is_base_currency: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Currency",
      tableName: "currencies",
      timestamps: false,
    }
  );

  return Currency;
};
