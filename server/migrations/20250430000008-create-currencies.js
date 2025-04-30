"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("currencies", {
      currency_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: Sequelize.STRING(3),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      symbol: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      is_base_currency: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("currencies");
  },
};
