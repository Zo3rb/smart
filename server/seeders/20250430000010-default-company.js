"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const companies = [
      {
        company_name: "Smart ERP Inc.",
        legal_name: "Smart ERP Incorporated",
        tax_id: "123456789",
        address_line1: "123 Main Street",
        address_line2: "Suite 100",
        city: "Tech City",
        state: "CA",
        postal_code: "94000",
        country: "USA",
        phone: "(555) 123-4567",
        email: "info@smarterp.com",
        website: "https://www.smarterp.com",
        created_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("companies", companies, {});

    return companies;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("companies", null, {});
  },
};
