module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define('Bookings', {
    checkin: DataTypes.STRING,
    checkout: DataTypes.STRING,
    roomId: DataTypes.STRING,
    requestId: DataTypes.STRING,
    facilityId: DataTypes.STRING,
    bookedBy: DataTypes.STRING
  }, {});
  Bookings.associate = (models) => {
    Bookings.belongsTo(models.Request, {
      foreignKey: 'id',
      as: 'request',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    Bookings.belongsTo(models.User, {
      foreignKey: 'bookedBy',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  };
  return Bookings;
};
