const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ExchangeRate extends Model {
    static associate(models) {
      ExchangeRate.belongsTo(models.Currency, {
        foreignKey: "currency_id",
        as: "currency",
      });
    }
  }

  ExchangeRate.init(
    {
      rate_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      currency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "currencies",
          key: "currency_id",
        },
      },
      rate_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      exchange_rate: {
        type: DataTypes.DECIMAL(12, 6),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ExchangeRate",
      tableName: "exchange_rates",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["currency_id", "rate_date"],
        },
      ],
    }
  );

  return ExchangeRate;
};
