"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [
      {
        role_name: "Admin",
        description: "System administrator with full access",
      },
      {
        role_name: "Manager",
        description: "Department manager with limited administrative access",
      },
      {
        role_name: "User",
        description: "Standard user with basic access",
      },
    ];

    await queryInterface.bulkInsert("roles", roles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
