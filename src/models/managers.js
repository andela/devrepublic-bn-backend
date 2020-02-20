'use strict';
module.exports = (sequelize, DataTypes) => {
  const Managers = sequelize.define('Managers', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Managers.associate = function(models) {
    // associations can be defined here
  };
  return Managers;
};