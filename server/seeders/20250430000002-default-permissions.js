"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const permissions = [
      {
        permission_name: "users:create",
        description: "Create users",
      },
      {
        permission_name: "users:read",
        description: "View users",
      },
      {
        permission_name: "users:update",
        description: "Update users",
      },
      {
        permission_name: "users:delete",
        description: "Delete users",
      },
      {
        permission_name: "roles:manage",
        description: "Manage roles",
      },
      {
        permission_name: "companies:manage",
        description: "Manage companies",
      },
      {
        permission_name: "branches:manage",
        description: "Manage branches",
      },
      {
        permission_name: "departments:manage",
        description: "Manage departments",
      },
    ];

    await queryInterface.bulkInsert("permissions", permissions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
