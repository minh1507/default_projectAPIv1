"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", [
      {
        name: "Admin",
        note: "Admin site",
        status: 1,
        createDate: new Date()
      },
      {
        name: "User",
        note: "User site",
        status: 1,
        createDate: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
  },
};
