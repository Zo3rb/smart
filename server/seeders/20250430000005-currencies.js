"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const currencies = [
      {
        code: "USD",
        name: "US Dollar",
        symbol: "$",
        is_base_currency: true,
      },
      {
        code: "EUR",
        name: "Euro",
        symbol: "€",
        is_base_currency: false,
      },
      {
        code: "GBP",
        name: "British Pound",
        symbol: "£",
        is_base_currency: false,
      },
      {
        code: "JPY",
        name: "Japanese Yen",
        symbol: "¥",
        is_base_currency: false,
      },
    ];

    await queryInterface.bulkInsert("currencies", currencies, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("currencies", null, {});
  },
};
