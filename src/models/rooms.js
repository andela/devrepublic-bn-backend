module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    facilityId: DataTypes.STRING,
    roomName: DataTypes.STRING,
    type: DataTypes.STRING,
    availability: DataTypes.BOOLEAN
  }, {});
  Rooms.associate = (models) => {
    Rooms.belongsTo(models.Facilities, {
      foreignKey: 'facilityId',
      foreignKeyConstraint: true
    });
  };
  return Rooms;
};
