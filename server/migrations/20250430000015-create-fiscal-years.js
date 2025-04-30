// server/migrations/20250430000015-create-fiscal-years.js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("fiscal_years", {
      fiscal_year_id: {
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
      year_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      is_closed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_by: {
        // Add this field to match your seeder
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
    });

    await queryInterface.addIndex("fiscal_years", ["company_id", "year_name"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("fiscal_years");
  },
};
