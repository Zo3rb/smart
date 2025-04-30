"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_roles", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "role_id",
        },
      },
    });

    await queryInterface.addIndex("user_roles", ["user_id", "role_id"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_roles");
  },
};
