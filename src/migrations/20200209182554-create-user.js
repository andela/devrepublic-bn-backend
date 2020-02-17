module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING 
      },
      signupMethod: {
        type: Sequelize.STRING,
        defaultValue: 'none',
        allowNull: false
      }, 
      oAuthId: {
        type: Sequelize.STRING,
        defaultValue: 'none'
      },
      isVerified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      language: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      residence: {
        type: Sequelize.STRING
      },
      image:{
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
    return queryInterface.dropTable('Users');
  }
};