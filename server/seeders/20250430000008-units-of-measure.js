"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const units = [
      {
        uom_name: "Each",
        abbreviation: "EA",
        description: "Single item unit",
      },
      {
        uom_name: "Kilogram",
        abbreviation: "KG",
        description: "Weight in kilograms",
      },
      {
        uom_name: "Liter",
        abbreviation: "L",
        description: "Volume in liters",
      },
      {
        uom_name: "Meter",
        abbreviation: "M",
        description: "Length in meters",
      },
      {
        uom_name: "Box",
        abbreviation: "BOX",
        description: "Standard box unit",
      },
      {
        uom_name: "Hour",
        abbreviation: "HR",
        description: "Time in hours",
      },
    ];

    await queryInterface.bulkInsert("uom", units, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("uom", null, {});
  },
};
