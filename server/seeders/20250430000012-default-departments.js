"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const departments = [
      {
        department_name: "Administration",
        description: "Company administration and management",
        manager_user_id: null, // Will be updated after admin user creation
        parent_department_id: null,
      },
      {
        department_name: "Finance",
        description: "Financial operations and accounting",
        manager_user_id: null,
        parent_department_id: null,
      },
      {
        department_name: "Sales",
        description: "Sales and customer relationship management",
        manager_user_id: null,
        parent_department_id: null,
      },
      {
        department_name: "Human Resources",
        description: "HR and personnel management",
        manager_user_id: null,
        parent_department_id: null,
      },
      {
        department_name: "IT",
        description: "Information Technology and systems support",
        manager_user_id: null,
        parent_department_id: null,
      },
    ];

    await queryInterface.bulkInsert("departments", departments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("departments", null, {});
  },
};
