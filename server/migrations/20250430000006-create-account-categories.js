"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("account_categories", {
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      category_type: {
        type: Sequelize.ENUM(
          "asset",
          "liability",
          "equity",
          "revenue",
          "expense"
        ),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });

    await queryInterface.addIndex("account_categories", ["category_name"]);
    await queryInterface.addIndex("account_categories", ["category_type"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("account_categories");
  },
};
