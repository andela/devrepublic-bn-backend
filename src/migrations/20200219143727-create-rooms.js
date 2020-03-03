module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      facilityId: {
        type: Sequelize.STRING,
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      roomName: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      availability: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    return queryInterface.dropTable('Rooms');
  }
};
