"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("branches", {
      branch_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "companies",
          key: "company_id",
        },
      },
      branch_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      address_line1: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      address_line2: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      is_headquarters: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("branches", ["company_id"]);
    await queryInterface.addIndex("branches", ["branch_name"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("branches");
  },
};
