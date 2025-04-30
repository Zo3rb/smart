"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // First, get the Admin role ID
    const [roles] = await queryInterface.sequelize.query(
      "SELECT role_id FROM roles WHERE role_name = 'Admin'"
    );
    const adminRoleId = roles[0]?.role_id;

    if (!adminRoleId) {
      console.log("Admin role not found, skipping permission assignment");
      return;
    }

    // Get all permissions
    const [permissions] = await queryInterface.sequelize.query(
      "SELECT permission_id FROM permissions"
    );

    // Create role-permission mappings for Admin role
    const rolePermissions = permissions.map((permission) => ({
      role_id: adminRoleId,
      permission_id: permission.permission_id,
    }));

    await queryInterface.bulkInsert("role_permissions", rolePermissions, {});
  },

  async down(queryInterface, Sequelize) {
    const [roles] = await queryInterface.sequelize.query(
      "SELECT role_id FROM roles WHERE role_name = 'Admin'"
    );
    const adminRoleId = roles[0]?.role_id;

    if (adminRoleId) {
      await queryInterface.bulkDelete(
        "role_permissions",
        { role_id: adminRoleId },
        {}
      );
    }
  },
};
