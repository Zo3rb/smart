"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("departments", {
      department_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      manager_user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      parent_department_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "departments",
          key: "department_id",
        },
      },
    });

    await queryInterface.addIndex("departments", ["department_name"]);
    await queryInterface.addIndex("departments", ["manager_user_id"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("departments");
  },
};
