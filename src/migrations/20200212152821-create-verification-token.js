'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VerificationTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        references: {model: 'Users', key: 'id'}
      },
      token: {
        type: Sequelize.STRING,
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
    }).then(() => {
      process.stdout.write('created VerificationToken table');
    }).then(() => { process.stdout.write('expireToken event created') });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('VerificationTokens')
      .then(() => {
        process.stdout.write('VerificationTokens table dropped')
    });
  }
};