"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const journals = [
      {
        journal_code: "GJ",
        journal_name: "General Journal",
        description: "For miscellaneous transactions",
        is_active: true,
      },
      {
        journal_code: "SJ",
        journal_name: "Sales Journal",
        description: "For recording sales transactions",
        is_active: true,
      },
      {
        journal_code: "PJ",
        journal_name: "Purchase Journal",
        description: "For recording purchase transactions",
        is_active: true,
      },
      {
        journal_code: "CRJ",
        journal_name: "Cash Receipts Journal",
        description: "For recording cash received",
        is_active: true,
      },
      {
        journal_code: "CPJ",
        journal_name: "Cash Payments Journal",
        description: "For recording cash paid out",
        is_active: true,
      },
    ];

    await queryInterface.bulkInsert("journals", journals, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("journals", null, {});
  },
};
