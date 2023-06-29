"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("db_users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "dm_roles",
          key: "id",
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
      },
      codeChange: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: { 
        allowNull: false, 
        type: Sequelize.STRING.BINARY 
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email:{
        allowNull: true,
        type: Sequelize.STRING
      },
      genderId: {
        type: Sequelize.INTEGER,
        references: {
          model: "dm_genders",
          key: "id",
        },
      },
      addressId: {
        type: Sequelize.INTEGER,
        references: {
          model: "dm_addresses",
          key: "id",
        },
      },
      image: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      accessToken: Sequelize.TEXT,
      refreshToken: Sequelize.TEXT,
      active: {
        allowNull: false,
        type:Sequelize.BOOLEAN,
        defaultValue: false,
      },
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
