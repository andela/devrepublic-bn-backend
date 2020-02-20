module.exports = (sequelize, DataTypes) => {
  const Facilities = sequelize.define('Facilities', {
    facilityName: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    numOfRooms: DataTypes.INTEGER
  }, {});
  Facilities.associate = (models) => {
    Facilities.hasMany(models.Rooms, {
      foreignKey: 'id',
      as: 'facilityId',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  };
  return Facilities;
};
