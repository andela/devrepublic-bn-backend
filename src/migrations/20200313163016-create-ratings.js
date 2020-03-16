module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references:{
          model: 'Users',
          key: 'id'
        }
      },
      facilityId: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references:{
          model: 'Facilities',
          key: 'id'
        }
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
    return queryInterface.dropTable('Ratings');
  }
};
