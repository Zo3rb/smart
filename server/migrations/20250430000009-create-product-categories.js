"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_categories", {
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      parent_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "product_categories",
          key: "category_id",
        },
      },
    });

    await queryInterface.addIndex("product_categories", ["category_name"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_categories");
  },
};
