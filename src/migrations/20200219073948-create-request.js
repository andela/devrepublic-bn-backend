module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      managerId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departureDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      returnDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accomodation: {
        type: Sequelize.STRING
      },
      stops:{
        type:Sequelize.ARRAY(Sequelize.JSON)
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profileData: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: [],
        allowNull: false,
      },
      confirm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable('Requests');
  }
};
