"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("exchange_rates", {
      rate_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      currency_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "currencies",
          key: "currency_id",
        },
      },
      rate_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      exchange_rate: {
        type: Sequelize.DECIMAL(12, 6),
        allowNull: false,
      },
    });

    await queryInterface.addIndex(
      "exchange_rates",
      ["currency_id", "rate_date"],
      {
        unique: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("exchange_rates");
  },
};
