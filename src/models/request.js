module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    email: DataTypes.STRING,
    location: DataTypes.STRING,
    destination: DataTypes.STRING,
    departureDate: DataTypes.STRING,
    returnDate: DataTypes.STRING,
    reason: DataTypes.STRING,
    accomodation: DataTypes.STRING,
    profileData: DataTypes.ARRAY(DataTypes.JSON),
    status: DataTypes.STRING,
    stops: DataTypes.ARRAY(DataTypes.JSON),
  }, {});
  Request.associate = (models) => {
    Request.belongsTo(models.User, {
      foreignKey: 'email',
      as: 'requester',
      onDelete: 'CASCADE'
    });
  };
  return Request;
};
