const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class UnitOfMeasure extends Model {
    static associate(models) {
      UnitOfMeasure.hasMany(models.Product, {
        foreignKey: "base_uom_id",
        as: "products",
      });
    }
  }

  UnitOfMeasure.init(
    {
      uom_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uom_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      abbreviation: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UnitOfMeasure",
      tableName: "uom",
      timestamps: false,
    }
  );

  return UnitOfMeasure;
};
