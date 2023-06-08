"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("addresses", [
      {
        name: "None",
        status: 1,
        createDate: new Date()
      },
      {
        name: "Thủ đô Hà Nội",
        status: 1,
        createDate: new Date()
      },
      {
        name: "Thành phố Hồ chí minh",
        status: 1,
        createDate: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
  },
};
