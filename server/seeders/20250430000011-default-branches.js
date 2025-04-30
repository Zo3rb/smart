"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get company ID
    const [companies] = await queryInterface.sequelize.query(
      "SELECT company_id FROM companies LIMIT 1"
    );

    if (companies.length === 0) {
      console.log("No company found, skipping branch creation");
      return;
    }

    const companyId = companies[0].company_id;

    const branches = [
      {
        company_id: companyId,
        branch_name: "Headquarters",
        address_line1: "123 Main Street",
        address_line2: "Suite 100",
        city: "Tech City",
        state: "CA",
        postal_code: "94000",
        country: "USA",
        phone: "(555) 123-4567",
        email: "hq@smarterp.com",
        is_headquarters: true,
        created_at: new Date(),
      },
      {
        company_id: companyId,
        branch_name: "East Coast Office",
        address_line1: "456 Park Avenue",
        address_line2: "15th Floor",
        city: "New York",
        state: "NY",
        postal_code: "10022",
        country: "USA",
        phone: "(555) 987-6543",
        email: "nyc@smarterp.com",
        is_headquarters: false,
        created_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("branches", branches, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("branches", null, {});
  },
};
