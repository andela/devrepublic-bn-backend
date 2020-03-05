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
      userId: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references:{
          model: 'Users',
          key: 'id',
          as: 'id'
        }
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
      stops:{
        type:Sequelize.ARRAY(Sequelize.JSON)
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'open',
        allowNull: false,
      },
      profileData: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: [],
        allowNull: false,
      },
      confirm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
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
