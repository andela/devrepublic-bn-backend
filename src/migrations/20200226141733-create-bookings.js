module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      checkin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      checkout: {
        allowNull: false,
        type: Sequelize.STRING
      },
      roomId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      requestId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      facilityId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bookedBy: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Bookings');
  }
};
