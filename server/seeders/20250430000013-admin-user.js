"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create admin user
    const passwordHash = await bcrypt.hash("admin123", 10);

    const users = [
      {
        username: "admin",
        password_hash: passwordHash,
        email: "admin@smarterp.com",
        first_name: "System",
        last_name: "Administrator",
        phone: "(555) 123-4567",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("users", users, {});

    // Get the admin user and role
    const [adminUsers] = await queryInterface.sequelize.query(
      "SELECT user_id FROM users WHERE username = 'admin'"
    );

    const [adminRoles] = await queryInterface.sequelize.query(
      "SELECT role_id FROM roles WHERE role_name = 'Admin'"
    );

    if (adminUsers.length > 0 && adminRoles.length > 0) {
      // Assign admin role to user
      await queryInterface.bulkInsert(
        "user_roles",
        [
          {
            user_id: adminUsers[0].user_id,
            role_id: adminRoles[0].role_id,
          },
        ],
        {}
      );

      // Update the Administration department with this user as manager
      await queryInterface.sequelize.query(
        `UPDATE departments SET manager_user_id = ${adminUsers[0].user_id} 
         WHERE department_name = 'Administration'`
      );
    }
  },

  async down(queryInterface, Sequelize) {
    // Find admin user
    const [adminUsers] = await queryInterface.sequelize.query(
      "SELECT user_id FROM users WHERE username = 'admin'"
    );

    if (adminUsers.length > 0) {
      // Remove user role assignments
      await queryInterface.bulkDelete(
        "user_roles",
        {
          user_id: adminUsers[0].user_id,
        },
        {}
      );

      // Reset department manager
      await queryInterface.sequelize.query(
        `UPDATE departments SET manager_user_id = NULL 
         WHERE manager_user_id = ${adminUsers[0].user_id}`
      );

      // Delete user
      await queryInterface.bulkDelete(
        "users",
        {
          username: "admin",
        },
        {}
      );
    }
  },
};
