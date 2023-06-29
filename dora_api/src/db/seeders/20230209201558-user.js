"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("db_users", [
      {
        roleId: 1,
        username: "duongdoican@gmail.com",
        password: "$2a$12$OQHHb/D9JAs6tyclVzPWMeSVkbcR2tSmmMq9VHaqnWm3C/UKPYyNm",
        lastName: "Duong",
        firstName: "Duc Anh",
        addressId: 1,
        genderId: 1,
        status: 1,
        active: 0,
        createDate: new Date()
      },
      {
        roleId: 2,
        username: "duongdoican1@gmail.com",
        password: "$2a$12$OQHHb/D9JAs6tyclVzPWMeSVkbcR2tSmmMq9VHaqnWm3C/UKPYyNm",
        lastName: "Duong",
        firstName: "Duc Anh",
        addressId: 2,
        genderId: 2,
        status: 1,
        active: 0,
        createDate: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
  },
};
