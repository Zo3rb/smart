"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get company ID and admin user ID
    const [companies] = await queryInterface.sequelize.query(
      "SELECT company_id FROM companies LIMIT 1"
    );

    const [adminUsers] = await queryInterface.sequelize.query(
      "SELECT user_id FROM users WHERE username = 'admin'"
    );

    if (companies.length === 0 || adminUsers.length === 0) {
      console.log(
        "Missing company or admin user, skipping fiscal year creation"
      );
      return;
    }

    const companyId = companies[0].company_id;
    const userId = adminUsers[0].user_id;

    // Create current fiscal year
    const currentYear = new Date().getFullYear();

    await queryInterface.bulkInsert(
      "fiscal_years",
      [
        {
          company_id: companyId,
          year_name: `FY ${currentYear}`,
          start_date: `${currentYear}-01-01`,
          end_date: `${currentYear}-12-31`,
          is_closed: false,
          created_by: userId,
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("fiscal_years", null, {});
  },
};
