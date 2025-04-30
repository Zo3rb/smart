"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // First create parent categories
    const parentCategories = [
      {
        category_name: "Inventory Items",
        description: "Physical goods held in inventory",
        parent_category_id: null,
      },
      {
        category_name: "Services",
        description: "Non-inventory service items",
        parent_category_id: null,
      },
      {
        category_name: "Raw Materials",
        description: "Materials used in manufacturing",
        parent_category_id: null,
      },
    ];

    await queryInterface.bulkInsert("product_categories", parentCategories, {});

    // Get the inserted parent categories
    const [categories] = await queryInterface.sequelize.query(
      "SELECT category_id, category_name FROM product_categories"
    );

    const categoryMap = categories.reduce((map, cat) => {
      map[cat.category_name] = cat.category_id;
      return map;
    }, {});

    // Create child categories
    const childCategories = [
      {
        category_name: "Office Supplies",
        description: "Office supplies and stationery",
        parent_category_id: categoryMap["Inventory Items"],
      },
      {
        category_name: "Electronics",
        description: "Electronic devices and accessories",
        parent_category_id: categoryMap["Inventory Items"],
      },
      {
        category_name: "Consulting",
        description: "Professional consulting services",
        parent_category_id: categoryMap["Services"],
      },
    ];

    await queryInterface.bulkInsert("product_categories", childCategories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("product_categories", null, {});
  },
};
