"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      {
        category_name: "Current Assets",
        category_type: "asset",
        description:
          "Assets that are expected to be converted to cash within one year",
      },
      {
        category_name: "Fixed Assets",
        category_type: "asset",
        description: "Long-term tangible assets",
      },
      {
        category_name: "Current Liabilities",
        category_type: "liability",
        description: "Debts or obligations due within one year",
      },
      {
        category_name: "Long-term Liabilities",
        category_type: "liability",
        description: "Debts or obligations due beyond one year",
      },
      {
        category_name: "Equity",
        category_type: "equity",
        description: "Owner's interest in the business",
      },
      {
        category_name: "Revenue",
        category_type: "revenue",
        description: "Income from business operations",
      },
      {
        category_name: "Cost of Goods Sold",
        category_type: "expense",
        description:
          "Direct costs attributable to the production of goods sold",
      },
      {
        category_name: "Operating Expenses",
        category_type: "expense",
        description: "Expenses related to business operations",
      },
    ];

    await queryInterface.bulkInsert("account_categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("account_categories", null, {});
  },
};
