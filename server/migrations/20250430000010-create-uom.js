"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("uom", {
      uom_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uom_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      abbreviation: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });

    await queryInterface.addIndex("uom", ["uom_name"]);
    await queryInterface.addIndex("uom", ["abbreviation"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("uom");
  },
};
