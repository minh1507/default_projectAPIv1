"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("dm_genders", [
      {
        name: "Male",
        status: 1,
        createDate: new Date()
      },
      {
        name: "Female",
        status: 1,
        createDate: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
  },
};
