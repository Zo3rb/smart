"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("accounts", {
      account_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      account_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      account_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "account_categories",
          key: "category_id",
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      parent_account_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "accounts",
          key: "account_id",
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

    await queryInterface.addIndex("accounts", ["account_code"]);
    await queryInterface.addIndex("accounts", ["account_name"]);
    await queryInterface.addIndex("accounts", ["category_id"]);
    await queryInterface.addIndex("accounts", ["parent_account_id"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("accounts");
  },
};
