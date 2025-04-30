"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("journals", {
      journal_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      journal_code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
      },
      journal_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });

    await queryInterface.addIndex("journals", ["journal_code"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("journals");
  },
};
