"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      product_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "product_categories",
          key: "category_id",
        },
      },
      base_uom_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "uom",
          key: "uom_id",
        },
      },
      barcode: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      is_inventory_item: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_purchasable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_sellable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      min_stock_level: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: true,
      },
      max_stock_level: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: true,
      },
      reorder_point: {
        type: Sequelize.DECIMAL(15, 3),
        allowNull: true,
      },
      default_buy_price: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      default_sell_price: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      tax_code: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      purchase_account_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "accounts",
          key: "account_id",
        },
      },
      inventory_account_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "accounts",
          key: "account_id",
        },
      },
      sales_account_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "accounts",
          key: "account_id",
        },
      },
      cogs_account_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "accounts",
          key: "account_id",
        },
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("products", ["product_code"]);
    await queryInterface.addIndex("products", ["product_name"]);
    await queryInterface.addIndex("products", ["category_id"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
