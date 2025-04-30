"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get category IDs
    const [categories] = await queryInterface.sequelize.query(
      "SELECT category_id, category_name FROM account_categories"
    );

    const categoryMap = categories.reduce((map, cat) => {
      map[cat.category_name] = cat.category_id;
      return map;
    }, {});

    // Create parent accounts first
    const parentAccounts = [
      {
        account_code: "1000",
        account_name: "Cash and Cash Equivalents",
        category_id: categoryMap["Current Assets"],
        description: "Cash and highly liquid investments",
        is_active: true,
        parent_account_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_code: "1200",
        account_name: "Accounts Receivable",
        category_id: categoryMap["Current Assets"],
        description: "Amounts owed to the company by customers",
        is_active: true,
        parent_account_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_code: "2000",
        account_name: "Accounts Payable",
        category_id: categoryMap["Current Liabilities"],
        description: "Amounts owed by the company to suppliers",
        is_active: true,
        parent_account_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_code: "4000",
        account_name: "Sales Revenue",
        category_id: categoryMap["Revenue"],
        description: "Income from sales",
        is_active: true,
        parent_account_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_code: "5000",
        account_name: "Expenses",
        category_id: categoryMap["Operating Expenses"],
        description: "General business expenses",
        is_active: true,
        parent_account_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("accounts", parentAccounts, {});

    // Get inserted parent account IDs
    const [accounts] = await queryInterface.sequelize.query(
      "SELECT account_id, account_code FROM accounts WHERE parent_account_id IS NULL"
    );

    const accountMap = accounts.reduce((map, acc) => {
      map[acc.account_code] = acc.account_id;
      return map;
    }, {});

    // Create child accounts
    const childAccounts = [
      {
        account_code: "1001",
        account_name: "Main Checking Account",
        category_id: categoryMap["Current Assets"],
        description: "Primary business checking account",
        is_active: true,
        parent_account_id: accountMap["1000"],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_code: "1002",
        account_name: "Savings Account",
        category_id: categoryMap["Current Assets"],
        description: "Business savings account",
        is_active: true,
        parent_account_id: accountMap["1000"],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_code: "5001",
        account_name: "Rent Expense",
        category_id: categoryMap["Operating Expenses"],
        description: "Office and facility rent",
        is_active: true,
        parent_account_id: accountMap["5000"],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_code: "5002",
        account_name: "Utilities Expense",
        category_id: categoryMap["Operating Expenses"],
        description: "Electricity, water, internet, etc.",
        is_active: true,
        parent_account_id: accountMap["5000"],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_code: "5003",
        account_name: "Salaries and Wages",
        category_id: categoryMap["Operating Expenses"],
        description: "Employee compensation",
        is_active: true,
        parent_account_id: accountMap["5000"],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("accounts", childAccounts, {});
  },

  async down(queryInterface, Sequelize) {
    // Delete all accounts (child accounts first to avoid constraint violations)
    await queryInterface.bulkDelete("accounts", null, {});
  },
};
