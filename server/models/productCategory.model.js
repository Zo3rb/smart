const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.hasMany(models.Product, {
        foreignKey: "category_id",
        as: "products",
      });

      ProductCategory.belongsTo(models.ProductCategory, {
        foreignKey: "parent_category_id",
        as: "parentCategory",
      });

      ProductCategory.hasMany(models.ProductCategory, {
        foreignKey: "parent_category_id",
        as: "childCategories",
      });
    }
  }

  ProductCategory.init(
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      parent_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "product_categories",
          key: "category_id",
        },
      },
    },
    {
      sequelize,
      modelName: "ProductCategory",
      tableName: "product_categories",
      timestamps: false,
    }
  );

  return ProductCategory;
};
