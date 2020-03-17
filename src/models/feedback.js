module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    facilityId: DataTypes.STRING,
    userId: DataTypes.STRING,
    feedback: DataTypes.TEXT
  }, {});
  Feedback.associate = (models) => {
    Feedback.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Feedback.belongsTo(models.Facilities, {
      foreignKey: 'facilityId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Feedback;
};
