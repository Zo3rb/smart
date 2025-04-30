"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
      customer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      company_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      contact_person: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      mobile: {
        type: Sequelize.STRING(20),
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
      website: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      tax_id: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      credit_limit: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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

    await queryInterface.addIndex("customers", ["customer_code"]);
    await queryInterface.addIndex("customers", ["company_name"]);
    await queryInterface.addIndex("customers", ["email"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("customers");
  },
};
