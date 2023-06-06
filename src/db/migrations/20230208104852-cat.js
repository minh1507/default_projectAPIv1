module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('cats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: Sequelize.STRING,
      age: Sequelize.INTEGER,
      fileUrl: Sequelize.STRING,
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
      updateDate: Sequelize.DATE
    });
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('cats');
  }
};