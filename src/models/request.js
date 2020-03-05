module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    managerId: DataTypes.STRING,
    email: DataTypes.STRING,
    userId: DataTypes.STRING,
    location: DataTypes.STRING,
    destination: DataTypes.STRING,
    departureDate: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN,
    returnDate: DataTypes.STRING,
    reason: DataTypes.STRING,
    profileData: DataTypes.ARRAY(DataTypes.JSON),
    status: DataTypes.ENUM('open', 'rejected', 'approved'),
    type: DataTypes.ENUM('one way', 'two way', 'multi city'),
    stops: DataTypes.ARRAY(DataTypes.JSON)
  }, {});
  Request.associate = (models) => {
    Request.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Request.hasMany(models.Comments, {
      foreignKey: 'requestId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Request.hasMany(models.Bookings, {
      foreignKey: 'id',
      as: 'request Id',
      onDelete: 'CASCADE'
    });
  };
  return Request;
};
