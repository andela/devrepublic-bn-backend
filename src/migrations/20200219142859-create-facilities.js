module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Facilities', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      facilityName: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      numOfRooms: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Facilities');
  }
};
