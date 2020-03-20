module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define('Ratings', {
    userId: DataTypes.STRING,
    facilityId: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  Ratings.associate = (models) => {
    Ratings.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Ratings.belongsTo(models.Facilities, {
      foreignKey: 'facilityId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Ratings;
};
