"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("role_permissions", {
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "role_id",
        },
      },
      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "permissions",
          key: "permission_id",
        },
      },
    });

    await queryInterface.addIndex("role_permissions", [
      "role_id",
      "permission_id",
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("role_permissions");
  },
};
