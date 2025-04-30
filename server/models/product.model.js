const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.ProductCategory, {
        foreignKey: "category_id",
        as: "category",
      });

      Product.belongsTo(models.UnitOfMeasure, {
        foreignKey: "base_uom_id",
        as: "baseUom",
      });

      // Account references
      Product.belongsTo(models.Account, {
        foreignKey: "purchase_account_id",
        as: "purchaseAccount",
      });

      Product.belongsTo(models.Account, {
        foreignKey: "inventory_account_id",
        as: "inventoryAccount",
      });

      Product.belongsTo(models.Account, {
        foreignKey: "sales_account_id",
        as: "salesAccount",
      });

      Product.belongsTo(models.Account, {
        foreignKey: "cogs_account_id",
        as: "cogsAccount",
      });

      Product.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "createdBy",
      });
    }
  }

  Product.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      product_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "product_categories",
          key: "category_id",
        },
      },
      base_uom_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "uom",
          key: "uom_id",
        },
      },
      barcode: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      is_inventory_item: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_purchasable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_sellable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      min_stock_level: {
        type: DataTypes.DECIMAL(15, 3),
        allowNull: true,
      },
      max_stock_level: {
        type: DataTypes.DECIMAL(15, 3),
        allowNull: true,
      },
      reorder_point: {
        type: DataTypes.DECIMAL(15, 3),
        allowNull: true,
      },
      default_buy_price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      default_sell_price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      tax_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      purchase_account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "accounts",
          key: "account_id",
        },
      },
      inventory_account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "accounts",
          key: "account_id",
        },
      },
      sales_account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "accounts",
          key: "account_id",
        },
      },
      cogs_account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "accounts",
          key: "account_id",
        },
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
      modelName: "Product",
      tableName: "products",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Product;
};
