"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
          key: "id",
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: { 
        allowNull: false, 
        type: Sequelize.STRING.BINARY 
      },
      accessToken: Sequelize.TEXT,
      refreshToken: Sequelize.TEXT,
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
    return await queryInterface.dropTable("users");
  },
};
