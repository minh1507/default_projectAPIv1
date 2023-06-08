"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        roleId: 1,
        username: "duongdoican@gmail.com",
        password: "$2a$12$OQHHb/D9JAs6tyclVzPWMeSVkbcR2tSmmMq9VHaqnWm3C/UKPYyNm",
        addressId: 1,
        genderId: 1,
        createDate: new Date()
      },
      {
        roleId: 2,
        username: "duongdoican1@gmail.com",
        password: "$2a$12$OQHHb/D9JAs6tyclVzPWMeSVkbcR2tSmmMq9VHaqnWm3C/UKPYyNm",
        addressId: 2,
        genderId: 2,
        createDate: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
  },
};
