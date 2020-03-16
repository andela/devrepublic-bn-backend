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
      amenities: {
        type: Sequelize.STRING
      },
      services: {
        type: Sequelize.STRING,
      },
      numOfRooms: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      likesId: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      unlikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      unlikesId: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      createdBy: {
        type: Sequelize.STRING 
      },
      totalRating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false 
      },
      averageRating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false 
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
