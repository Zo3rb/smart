"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("permissions", {
      permission_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      permission_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });

    await queryInterface.addIndex("permissions", ["permission_name"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("permissions");
  },
};
