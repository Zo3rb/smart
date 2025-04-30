"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("companies", {
      company_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      legal_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tax_id: {
        type: Sequelize.STRING(50),
        allowNull: true,
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
      website: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      logo_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("companies", ["company_name"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("companies");
  },
};
