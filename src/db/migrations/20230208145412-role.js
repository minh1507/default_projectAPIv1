"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { 
        allowNull: false, type: Sequelize.STRING 
      },
      note: Sequelize.TEXT,
      status: {
        allowNull: false,
        type:Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createBy: Sequelize.INTEGER,
      createDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updateBy: Sequelize.INTEGER,
      updateDate: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("roles");
  },
};
